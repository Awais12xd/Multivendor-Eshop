import mongoose, { Schema } from "mongoose";

const messageSchema = new Schema(
  {
    conversationId: {
      type: String,
    },
    sender: {
      type: String,
    },
    text: {
      type: String,
    },
    images: [{ type: String }],
  },
  {
    timestamps: true,
  }
);

export const Message = mongoose.model("Message", messageSchema);
