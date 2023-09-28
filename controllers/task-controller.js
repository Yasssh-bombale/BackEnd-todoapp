import errorHandler from "../middlewares/error.js";
import { Task } from "../models/task.js";

// !  create;
export const createTask = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    await Task.create({
      title,
      description,
      user: req.user,
    });

    return res.status(201).json({
      success: true,
      msg: "Task created !",
    });
  } catch (error) {
    next(error);
  }
};

// ! Read
export const getTask = async (req, res, next) => {
  try {
    const task = await Task.find({});
    if (!task) {
      return next(new errorHandler("No Task Found !", 400));
    }
    return res.status(200).json({
      success: true,
      task,
    });
  } catch (error) {
    next(error);
  }
};

// !  Update

export const updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);
    if (!task) return next(new errorHandler("Task Not Found !", 400));
    task.isCompleted = !task.isCompleted;
    await task.save();
    return res.status(200).json({
      success: true,
      msg: "Task Updated Successfully !",
    });
  } catch (error) {
    next(error);
  }
};
export const deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);
    if (!task) return next(new errorHandler("Task Not Found !", 400));

    await task.deleteOne();
    return res.status(200).json({
      success: true,
      msg: "Task Deleted Successfully !",
    });
  } catch (error) {
    next(error);
  }
};
