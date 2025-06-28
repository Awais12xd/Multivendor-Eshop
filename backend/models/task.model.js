import mongoose, { Schema } from "mongoose";

const todoSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

const taskSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    status: {
      type: String,
      enum: ["in progress", "completed", "pending"],
      default: "pending",
    },
    dueDate: {
      type: Date,
      required: true,
    },
    assignedTo: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    attachments: {
      type: String,
    },
    todoCheckList: [todoSchema],
    progress: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export const Task = mongoose.model("Task", taskSchema);
