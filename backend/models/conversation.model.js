import mongoose, { Schema } from "mongoose";

const conversationSchema = new Schema({
    members: {
        type: Array,
    },
    groupTitle: {
        type: String,
    },
    lastMessage: {
        type: String,
    },
    lastMessageId: {
        type: String,
    },
},
{
    timestamps: true,
});


export const Conversation = mongoose.model("Conversation", conversationSchema);
