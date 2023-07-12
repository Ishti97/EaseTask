import mongoose from "mongoose";

const taskSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "users",
    },
    title: {
      type: String,
      required: [true, "Please add task title"],
    },
    description: {
      type: String,
      required: [true, "Please add task description"],
    },
    deadline: {
      type: String,
      required: [true, "Please add task deadline"],
    },
    category: {
        type: String,
        required: [true, "Please add task category"],
      },
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model("tasks", taskSchema);
export default Task;