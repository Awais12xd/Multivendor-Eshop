import React, { useEffect, useRef, useState } from "react";
import Header from "../layout/Header.jsx";
import { useSelector } from "react-redux";
import io from "socket.io-client";
import { format } from "timeago.js";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { GrGallery } from "react-icons/gr";
import { AiOutlineSend } from "react-icons/ai";

// const SOCKET_URL = "http://localhost:4000";
const SOCKET_URL = import.meta.env.VITE_SOCKET_URL;

const UserInbox = () => {
  const { user } = useSelector((state) => state.user);
  const socketRef = useRef(null);

  const [conversations, setConversations] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [messages, setMessages] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [userData, setUserData] = useState(null); // currently selected chat partner
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [activeStatus, setActiveStatus] = useState(false);

  /* ------------------ SOCKET SETUP (mount / unmount) ------------------ */
  useEffect(() => {
    // create socket once
    socketRef.current = io(SOCKET_URL, { withCredentials: true });

    // handler for incoming messages
    const incomingHandler = (data) => {
      // expect data to include: senderId, text, conversationId, createdAt (server should attach)
      setArrivalMessage({
        sender: data.senderId ?? data.sender,
        text: data.text,
        conversationId: data.conversationId,
        createdAt: data.createdAt ?? Date.now(),
      });
    };

    socketRef.current.on("getMessage", incomingHandler);

    // handler for online users list
    const usersHandler = (list) => {
      setOnlineUsers(list || []);
    };
    socketRef.current.on("getUsers", usersHandler);

    // cleanup on unmount
    return () => {
      socketRef.current.off("getMessage", incomingHandler);
      socketRef.current.off("getUsers", usersHandler);
      socketRef.current.disconnect();
      socketRef.current = null;
    };
  }, []);

  /* ------------------ when user logs in, register on socket ------------------ */
  useEffect(() => {
    if (!user?._id || !socketRef.current) return;
    socketRef.current.emit("addUser", user._id);
    // optionally we could request users list or server pushes it
  }, [user?._id]);

  /* ------------------ append incoming message only if it belongs to current chat ------------------ */
  useEffect(() => {
    if (
      !arrivalMessage ||
      !currentChat ||
      !arrivalMessage.conversationId
    ) {
      return;
    }

    if (arrivalMessage.conversationId === currentChat._id) {
      // message belongs to the open chat → append
      setMessages((prev) => [...prev, arrivalMessage]);
    } else {
      // message belongs to some other conversation: you can mark unread or update conversation preview
      // Example: update conversations list lastMessage if desired (non-destructive)
      setConversations((prev) =>
        prev.map((conv) =>
          conv._id === arrivalMessage.conversationId
            ? { ...conv, lastMessage: arrivalMessage.text, lastMessageId: arrivalMessage.sender }
            : conv
        )
      );
    }
  }, [arrivalMessage, currentChat]);

  /* ------------------ fetch conversations once when user is available ------------------ */
  useEffect(() => {
    if (!user?._id) return;
    const fetchConversations = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/conversation/get-user-conversations/${user._id}`,
          { withCredentials: true }
        );
        if (res.data.success) {
          setConversations(res.data.data || []);
        } else {
          toast.error(res.data.message || "Failed to load conversations");
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchConversations();
  }, [user?._id]);

  /* ------------------ check online status helper ------------------ */
  const onlineCheck = (chat) => {
    if (!chat || !onlineUsers) return false;
    const otherId = chat.members.find((m) => m !== user?._id);
    return onlineUsers.some((u) => u.userId === otherId);
  };

  /* ------------------ fetch messages once when currentChat changes ------------------ */
  useEffect(() => {
    if (!currentChat?._id) {
      setMessages([]);
      return;
    }

    // tell server we want to join the conversation room (server should optionally handle it)
    socketRef.current?.emit("joinRoom", currentChat._id);

    const fetchMessages = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/message/get-all-messages/${currentChat._id}`
        );
        if (res.data.success) {
          setMessages(res.data.data || []);
        } else {
          toast.error(res.data.message || "Failed to load messages");
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchMessages();
  }, [currentChat?._id]);

  /* ------------------ send message ------------------ */
  const sendMesasageHandler = async (e) => {
    e.preventDefault();
    if (!newMessage?.trim() || !currentChat) return;

    const messagePayload = {
      sender: user._id,
      text: newMessage,
      conversationId: currentChat._id,
      createdAt: Date.now(),
    };

    const receiverId = currentChat.members.find((m) => m !== user._id);

    // send over socket with conversationId so client can route it
    socketRef.current?.emit("sendMessage", {
      senderId: user._id,
      receiverId,
      conversationId: currentChat._id,
      text: newMessage,
    });

    // persist to backend
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/message/create-message`,
        messagePayload
      );
      if (res.data.success) {
        // append returned message
        setMessages((prev) => [...prev, res.data.data]);
        // update last message in conversation on server
        try {
          await axios.put(
            `${import.meta.env.VITE_SERVER_URL}/conversation/update-last-message/${currentChat._id}`,
            {
              lastMessage: newMessage,
              lastMessageId: user._id,
            }
          );
          // optionally update local conversations preview
          setConversations((prev) =>
            prev.map((c) =>
              c._id === currentChat._id
                ? { ...c, lastMessage: newMessage, lastMessageId: user._id }
                : c
            )
          );
        } catch (err) {
          console.error("Failed to update last message:", err);
        }
        setNewMessage("");
      } else {
        toast.error(res.data.message || "Failed to send message");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="w-full">
      <Header />
      {!open && (
        <>
          <h1 className="text-center text-[30px] py-3 font-[500]">All Messages</h1>

          {conversations.map((item) => (
            <ChatList
              key={item._id}
              item={item}
              me={user?._id}
              setOpen={setOpen}
              setCurrentChat={setCurrentChat}
              setUserData={setUserData}
              online={onlineCheck(item)}
              setActiveStatus={setActiveStatus}
            />
          ))}
        </>
      )}

      {open && (
        <UserChat
          setOpen={setOpen}
          newMessage={newMessage}
          setNewMessage={setNewMessage}
          sendMesasageHandler={sendMesasageHandler}
          messages={messages}
          me={user?._id}
          userData={userData}
          activeStatus={activeStatus}
          currentChat={currentChat}
        />
      )}
    </div>
  );
};

/* ------------------ ChatList (each row fetches its own user data) ------------------ */
const ChatList = ({
  item,
  me,
  setOpen,
  setCurrentChat,
  setUserData,
  online,
  setActiveStatus,
}) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const otherId = item.members.find((m) => m !== me);
    let mounted = true;
    axios
      .get(`${import.meta.env.VITE_SERVER_URL}/shop/getSellerInfo/${otherId}`)
      .then((res) => {
        if (mounted && res.data.success) setUser(res.data.data);
      })
      .catch((err) => {
        console.error(err);
      });
    return () => {
      mounted = false;
    };
  }, [item, me]);

  const handleClick = () => {
    setCurrentChat(item);
    setUserData(user);
    setActiveStatus(online);
    setOpen(true);
    navigate(`?${item._id}`);
  };

  const isActive = false; // if you want active highlighting by currentChat compare parent currentChat._id === item._id (not provided here)

  return (
    <div
      className={`flex w-full p-3 ${isActive ? "bg-yellow-400" : "bg-gray-200"} cursor-pointer items-center`}
      onClick={handleClick}
    >
      <div className="relative">
        <img
          src={`${user?.avatar?.url ?? ""}`}
          alt=""
          className="rounded-full w-[60px] h-[60px] object-cover"
        />
        <div className={`active w-[14px] h-[14px] absolute rounded-full right-0 top-1 ${online ? "bg-green-500" : "bg-gray-500"}`}></div>
      </div>

      <div className="pl-3">
        <h1 className="text-[18px]">{user?.name ?? "Loading..."}</h1>
        <p className="text-[16px] pt-1 text-gray-800 line-clamp-1">
          {item?.lastMessageId !== user?._id ? "You:" : `${user?.name?.split(" ")[0] ?? ""}: `} {item?.lastMessage}
        </p>
      </div>
    </div>
  );
};

/* ------------------ UserChat ------------------ */
const UserChat = ({
  setOpen,
  newMessage,
  setNewMessage,
  sendMesasageHandler,
  messages,
  me,
  userData,
  activeStatus,
  currentChat,
}) => {
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="w-full min-h-full flex flex-col justify-between ">
      {/* Header */}
      <div className="flex p-3 items-center justify-between bg-[#ffffe9] shadow-md">
        <div className="flex items-center">
          <img
            src={`${userData?.avatar?.url ?? ""}`}
            alt=""
            className="rounded-full w-[60px] h-[60px] object-cover"
          />
          <div className="pl-3">
            <h1 className="text-[22px] font-semibold">{userData?.name ?? "Conversation"}</h1>
            <h2 className="text-[19px] text-gray-600">{activeStatus ? "Active Now" : ""}</h2>
          </div>
        </div>
        <div className="">
          <FaArrowRight size={20} className="cursor-pointer" onClick={() => setOpen(false)} />
        </div>
      </div>

      {/* Messages */}
      <div className="px-3 h-[67vh] py-3 overflow-y-scroll">
        {messages.map((item) => (
          <div key={item._id ?? `${item.createdAt}-${Math.random()}`} className={`flex w-full my-2 ${item.sender === me ? "justify-end" : "justify-start"}`}>
            {item.sender !== me && (
              <img src={`${userData?.avatar?.url ?? ""}`} alt="" className="rounded-full w-[40px] h-[40px] object-cover mr-2" />
            )}
            <div className={`flex flex-col ${item.sender === me ? "items-end" : "items-start"} py-1`}>
              <div className="flex w-max p-2 rounded bg-green-500 text-white h-min">
                <p>{item.text}</p>
              </div>
              <p className="text-gray-600 pt-1 text-[11px]">{format(item.createdAt)}</p>
            </div>
          </div>
        ))}
        <div ref={scrollRef} />
      </div>

      {/* Sending input */}
      <form onSubmit={sendMesasageHandler} aria-required={true} className=" relative w-full flex items-center justify-between shadow-md bg-[#ffffe9]">
        <div className="w-[3%]  flex justify-center">
          <GrGallery size={25} className="cursor-pointer  text-gray-700" />
        </div>
        <div className="w-[97%]">
          <input type="text" placeholder="Enter your message..." className={`w-full  py-3 pl-2 md:pl-4  md:text-lg  bg-transparent h-16`} value={newMessage} onChange={(e) => setNewMessage(e.target.value)} />
          <input type="submit" value="Send" className="hidden" id="send" />
          <label htmlFor="send">
            <AiOutlineSend size={30} className="absolute right-5 cursor-pointer top-2/7 text-gray-700" />
          </label>
        </div>
      </form>
    </div>
  );
};

export default UserInbox;
