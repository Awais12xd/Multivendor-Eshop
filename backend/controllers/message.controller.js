import { errorHandler } from "../utils/errorHandler.js";
import { apiResponse } from "../utils/apiResponse.js";
import { Message } from "../models/message.model.js"; 

//Create a new conversation
const createMessage = async (req, res, next) => {
  try {
      const messageData = req.body;
      console.log(messageData);

      if(req.files){
        const files = req.files;
        const imageUrls = files.map((file) => `${file.fileName}`)
        messageData.images = imageUrls;
      }

      messageData.conversationId = req.body.conversationId;
      messageData.sender = req.body.sender;
      messageData.text = req.body.text;

      const message = new Message({
        conversationId : messageData.conversationId,
        text : messageData.text,
        sender : messageData.sender,
        images : messageData.images ? messageData.images : undefined
      });
      console.log(message)

      await message.save();

     res
      .status(200)
      .json(
        new apiResponse(200, "Message Created successfully!", message)
      );
     
  } catch (error) {
    console.log("Error while creating message", error);
    return next(new errorHandler(error.message, 500));
  }
};

//Get all messaegs with conversation id
const getAllMessages = async (req, res, next) => {
  try {

      const messages = await Message.find({
        conversationId : req.params.id
      });

     res
      .status(200)
      .json(
        new apiResponse(200, "All messages found successfully!", messages)
      );
     
  } catch (error) {
    console.log("Error while getting all messages", error);
    return next(new errorHandler(error.message, 500));
  }
};

export { createMessage , getAllMessages};
