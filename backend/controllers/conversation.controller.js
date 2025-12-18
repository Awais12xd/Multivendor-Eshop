import { errorHandler } from "../utils/errorHandler.js";
import { apiResponse } from "../utils/apiResponse.js";
import { Conversation } from "../models/conversation.model.js";
import fs from "fs";

//Create a new conversation
const createConversation = async (req, res, next) => {
  try {
    const { groupTitle, userId, sellerId } = req.body;

    const isConversationExists = await Conversation.findOne({ groupTitle });
    if (isConversationExists) {
      const conversation = isConversationExists;
      res
        .status(200)
        .json(
          new apiResponse(200, "Conversation found successfully!", conversation)
        );
    } else {
      const conversation = await Conversation.create({
        members: [userId, sellerId],
        groupTitle: groupTitle,
      });

      res
        .status(200)
        .json(
          new apiResponse(
            200,
            "Conversation created successfully!",
            conversation
          )
        );
    }
  } catch (error) {
    console.log("Error while creating conversation", error);
    return next(new errorHandler(error.message, 500));
  }
};
//Get all seller conversations
const getSellerConversations = async (req, res, next) => {
  try {
    const conversations = await Conversation.find({
      members: { $in: [req.params.id] },
    }).sort({ updatedAt: -1, createdAt: -1 });

    res
      .status(200)
      .json(
        new apiResponse(
          200,
          "Sller Conversations found successfully!",
          conversations
        )
      );
  } catch (error) {
    console.log("Error while getting seller conversations", error);
    return next(new errorHandler(error.message, 500));
  }
};
//Get all user conversations
const getUserConversations = async (req, res, next) => {
  try {
    const conversations = await Conversation.find({
      members: { $in: [req.params.id] },
    }).sort({ updatedAt: -1, createdAt: -1 });

    res
      .status(200)
      .json(
        new apiResponse(
          200,
          "User Conversations found successfully!",
          conversations
        )
      );
  } catch (error) {
    console.log("Error while getting user conversations", error);
    return next(new errorHandler(error.message, 500));
  }
};
//Update the last message
const updateLastMessage = async (req, res, next) => {
  try {
    const { lastMessage, lastMessageId } = req.body;
    const conversations = await Conversation.findByIdAndUpdate(req.params.id, {
      lastMessage: lastMessage,
      lastMessageId: lastMessageId,
    });

    res
      .status(200)
      .json(
        new apiResponse(
          200,
          "Last messsage updated successfully!",
          conversations
        )
      );
  } catch (error) {
    console.log("Error while updating the last message.", error);
    return next(new errorHandler(error.message, 500));
  }
};

export { createConversation, getSellerConversations, updateLastMessage , getUserConversations };
