// DashboardMessages.jsx
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { GrGallery } from "react-icons/gr";
import { AiOutlineSend } from "react-icons/ai";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styles from "../../style/style";
import io from "socket.io-client";
import { format } from "timeago.js";

// const SOCKET_URL = "http://localhost:4000";
const SOCKET_URL = import.meta.env.VITE_SOCKET_URL;

const DashboardMessages = () => {
  const { seller } = useSelector((state) => state.seller);

  // socket ref
  const socketRef = useRef(null);

  // state
  const [conversations, setConversations] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [messages, setMessages] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [activeStatus, setActiveStatus] = useState(false);

  const scrollRef = useRef(null);

  /* ------------------- Socket setup ------------------- */
  useEffect(() => {
    socketRef.current = io(SOCKET_URL, { withCredentials: true });

    const handleGetMessage = (data) => {
      // expect server to emit: { senderId, text, conversationId, createdAt? }
      setArrivalMessage({
        sender: data.senderId ?? data.sender,
        text: data.text,
        conversationId: data.conversationId,
        createdAt: data.createdAt ?? Date.now(),
      });
    };

    const handleGetUsers = (list) => {
      setOnlineUsers(list || []);
    };

    socketRef.current.on("getMessage", handleGetMessage);
    socketRef.current.on("getUsers", handleGetUsers);

    return () => {
      socketRef.current.off("getMessage", handleGetMessage);
      socketRef.current.off("getUsers", handleGetUsers);
      socketRef.current.disconnect();
      socketRef.current = null;
    };
  }, []);

  /* ------------------- Register seller on socket ------------------- */
  useEffect(() => {
    if (!seller?._id || !socketRef.current) return;
    socketRef.current.emit("addUser", seller._id);
  }, [seller?._id]);

 /* ------------------- Handle incoming socket message ------------------- */
useEffect(() => {
  if (!arrivalMessage) return;

  // Ignore server echo of messages we sent ourselves to avoid duplicates.
  // The backend commonly broadcasts the message to both parties, including the sender.
  if (arrivalMessage.sender === seller?._id) {
    return;
  }

  // If the message belongs to the currently opened chat, append it to messages
  if (currentChat && arrivalMessage.conversationId === currentChat._id) {
    setMessages((prev) => [...prev, arrivalMessage]);
  } else {
    // Otherwise update the conversations preview (lastMessage)
    setConversations((prev) =>
      prev.map((conv) =>
        conv._id === arrivalMessage.conversationId
          ? {
              ...conv,
              lastMessage: arrivalMessage.text,
              lastMessageId: arrivalMessage.sender,
            }
          : conv
      )
    );
  }
}, [arrivalMessage, currentChat, seller?._id]);


  /* ------------------- Fetch conversations (once seller available) ------------------- */
  useEffect(() => {
    if (!seller?._id) return;

    const fetchConversations = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/conversation/get-seller-conversations/${seller._id}`,
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
  }, [seller?._id]);

  /* ------------------- Online helper ------------------- */
  const onlineCheck = (chat) => {
    if (!chat || !onlineUsers) return false;
    const other = chat.members.find((m) => m !== seller?._id);
    return onlineUsers.some((u) => u.userId === other);
  };

  /* ------------------- Fetch messages when currentChat changes ------------------- */
  useEffect(() => {
    if (!currentChat?._id) {
      setMessages([]);
      return;
    }

    // join room (server can implement socket.join)
    socketRef.current?.emit("joinRoom", currentChat._id);

    const fetchAllMessages = async () => {
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

    fetchAllMessages();
  }, [currentChat?._id]);

  /* ------------------- Scroll to bottom on messages change ------------------- */
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  /* ------------------- Send message ------------------- */
  const sendMesasageHandler = async (e) => {
    e.preventDefault();
    if (!newMessage?.trim() || !currentChat) return;

    const message = {
      sender: seller._id,
      text: newMessage,
      conversationId: currentChat._id,
      createdAt: Date.now(),
    };

    const receiverId = currentChat.members.find((member) => member !== seller._id);

    // Emit socket message (include conversationId)
    socketRef.current?.emit("sendMessage", {
      senderId: seller._id,
      receiverId,
      conversationId: currentChat._id,
      text: newMessage,
    });

    // Persist to backend
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/message/create-message`,
        message
      );
      if (res.data.success) {
        // append message safely using functional update
        setMessages((prev) => [...prev, res.data.data]);

        // Update conversation last message locally and on server
        setConversations((prev) =>
          prev.map((c) =>
            c._id === currentChat._id
              ? { ...c, lastMessage: newMessage, lastMessageId: seller._id }
              : c
          )
        );

        try {
          await axios.put(
            `${import.meta.env.VITE_SERVER_URL}/conversation/update-last-message/${currentChat._id}`,
            {
              lastMessage: newMessage,
              lastMessageId: seller._id,
            }
          );
        } catch (err) {
          console.error("Failed to update last message on server:", err);
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
    <div className="w-[90%] bg-white md:m-5 md:h-[85vh]  rounded">
      {/* All messages list */}
      {!open && (
        <>
          <h1 className="text-center text-[22px] md:text-[30px] py-3 font-[500]">All Messages</h1>

          {conversations.map((item) => (
            <ChatList
              item={item}
              key={item._id}
              setOpen={setOpen}
              setCurrentChat={setCurrentChat}
              sellerId={seller?._id}
              userData={userData}
              setUserData={setUserData}
              online={onlineCheck(item)}
              setActiveStatus={setActiveStatus}
            />
          ))}
        </>
      )}

      {/* Inbox */}
      {open && (
        <SellerInbox
          setOpen={setOpen}
          newMessage={newMessage}
          setNewMessage={setNewMessage}
          sendMesasageHandler={sendMesasageHandler}
          messages={messages}
          sellerId={seller?._id}
          userData={userData}
          activeStatus={activeStatus}
          scrollRef={scrollRef}
        />
      )}
    </div>
  );
};

/* ------------------- ChatList component ------------------- */
const ChatList = ({
  item,
  setOpen,
  setCurrentChat,
  sellerId,
  userData,
  setUserData,
  online,
  setActiveStatus,
}) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const otherId = item.members.find((m) => m !== sellerId);
    let mounted = true;

    axios
      .get(`${import.meta.env.VITE_SERVER_URL}/user/get-user-info/${otherId}`)
      .then((res) => {
        if (mounted && res.data.success) setUser(res.data.data);
      })
      .catch((err) => console.error(err));

    return () => {
      mounted = false;
    };
  }, [item, sellerId]);

  const handleClick = () => {
    setCurrentChat(item);
    setUserData(user);
    setActiveStatus(online);
    setOpen(true);
    navigate(`?${item._id}`);
  };

  return (
    <div
      className={`flex w-full p-3 ${false ? "bg-yellow-400" : "bg-gray-200"} cursor-pointer items-center`}
      onClick={handleClick}
    >
      <div className="relative">
        <img
          src={`${user?.avatar?.url ?? ""}`}
          alt=""
          className="rounded-full md:w-[60px] md:h-[60px] w-[40px] h-[40px] object-cover"
        />
        <div className={`active w-[14px] h-[14px] absolute rounded-full right-0 top-0 md:top-1 ${online ? "bg-green-500" : "bg-gray-500"}`}></div>
      </div>
      <div className="md:pl-3 pl-2">
        <h1 className="md:text-[18px] text-[15px]">{user?.name ?? "Loading..."}</h1>
        <p className="md:text-[16px] text-[14px] pt-1 text-gray-800 line-clamp-1">
          {item?.lastMessageId !== user?._id ? "You:" : `${user?.name?.split(" ")[0] ?? ""}: `} {item?.lastMessage}
        </p>
      </div>
    </div>
  );
};

/* ------------------- SellerInbox component ------------------- */
const SellerInbox = ({
  setOpen,
  newMessage,
  setNewMessage,
  sendMesasageHandler,
  messages,
  sellerId,
  userData,
  activeStatus,
  scrollRef,
}) => {
  return (
    <div className="w-full min-h-full flex flex-col justify-between ">
      {/* Header */}
      <div className="flex p-3 items-center justify-between bg-[#ffffe9] shadow-md">
        <div className="flex items-center">
          <img
            src={`${userData?.avatar?.url ?? ""}`}
            alt=""
            className="rounded-full md:w-[60px] md:h-[60px] w-[40px] h-[40px] object-cover"
          />
          <div className="pl-3">
            <h1 className="md:text-[22px] text-[16px] font-semibold">{userData?.name ?? "Conversation"}</h1>
            <h2 className="text-[14px] md:text-[19px] text-gray-600">{activeStatus ? "Active Now" : ""}</h2>
          </div>
        </div>
        <div>
          <FaArrowRight size={20} className="cursor-pointer hidden md:block" onClick={() => setOpen(false)} />
          <FaArrowRight size={15} className="cursor-pointer block md:hidden" onClick={() => setOpen(false)} />
        </div>
      </div>
      

      {/* Messages */}
      <div className="px-3 h-[67vh] py-3 overflow-y-scroll">
        {messages.map((item) => (
          <div key={item._id ?? `${item.createdAt}-${Math.random()}`} className={`flex w-full my-2 ${item.sender === sellerId ? "justify-end" : "justify-start"}`}>
            {item.sender !== sellerId && (
              <img
                src={`${userData?.avatar?.url ?? ""}`}
                alt=""
                className="rounded-full md:w-[40px] md:h-[40px] w-[30px] h-[30px] object-cover md:mr-2 mr-1"
              />
            )}
            <div className={`flex flex-col ${item.sender === sellerId ? "items-end" : "items-start"} py-1`}>
              <div className="flex w-max p-2 rounded bg-green-500 text-white h-min">
                <p className="md:text-base text-xs">{item.text}</p>
              </div>
              <p className="text-gray-600 pt-1 md:text-[11px] text-[9px]">{format(item.createdAt)}</p>
            </div>
          </div>
        ))}
        <div ref={scrollRef} />
      </div>

      {/* Sending input */}
      <form onSubmit={sendMesasageHandler} aria-required={true} className="relative w-full flex items-center justify-between shadow-md bg-[#ffffe9]">
        {/* <div className="w-[3%] flex justify-center">
          <GrGallery size={25} className="cursor-pointer text-gray-700" />
        </div> */}
        <div className="w-full">
          <input type="text" placeholder="Enter your message..." className={`w-full py-3 pl-2 md:pl-4 md:text-lg bg-transparent h-16`} value={newMessage} onChange={(e) => setNewMessage(e.target.value)} />
          <input type="submit" value="Send" className="hidden" id="send" />
          <label htmlFor="send">
            <AiOutlineSend size={30} className="absolute md:block  hidden right-5 cursor-pointer top-2/7 text-gray-700" />
            <AiOutlineSend size={20} className="absolute md:hidden right-5 cursor-pointer top-2/6 text-gray-700" />
           
          </label>
        </div>
      </form>
    </div>
  );
};

export default DashboardMessages;
