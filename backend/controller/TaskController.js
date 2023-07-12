import asyncHandler from "express-async-handler";
import Task from "../models/TaskModel.js";
import User from "../models/userModel.js";

const saveToDo = asyncHandler(async (req, res) => {
  const { title, description, deadline, category } = req.body;
  const toDo = await Task.create({
    user_id: res.locals.user._id,
    title,
    description,
    deadline,
    category,
  });
//  res.send(toDo);
  res.status(200).json({ toDo });
});

const updateToDo = asyncHandler(async (req, res) => {
  const task_to_update = await Task.findById(req.body._id);
  const user = await User.findById(res.locals.user._id);

  if (task_to_update.user_id.toString() != res.locals.user._id) {
    res.status(403);
    throw new Error("User don't have permission to update other user contacts");
  }

  if (user) {
    if (task_to_update) {
      task_to_update.title = req.body.title || task_to_update.title;
      task_to_update.description = req.body.description || task_to_update.description;
      task_to_update.deadline = req.body.deadline || task_to_update.deadline;
      task_to_update.category = req.body.category || task_to_update.category;

      const updatedTask = await task_to_update.save();

      res.status(200).json({
        user_id: updatedTask.user_id,
        _id: updatedTask._id,
        title: updatedTask.title,
        description: updatedTask.description,
        deadline: updatedTask.deadline,
        category: updatedTask.category,
      });
    } else {
      res.status(404);
      throw new Error("Task not found");
    }
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const deleteToDo = asyncHandler(async (req, res) => {
  const task_to_delete = await Task.findById(req.body._id);
  if (!task_to_delete) {
    res.status(404);
    throw new Error("Task not found");
  }

  if (task_to_delete.user_id.toString() != res.locals.user._id) {
    res.status(403);
    throw new Error("User don't have permission to update other user contacts");
  }

  await Task.deleteOne({ _id: req.body._id });
  res.status(200).json(task_to_delete);
});

export {saveToDo, updateToDo, deleteToDo };
