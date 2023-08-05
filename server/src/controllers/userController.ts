import { NextFunction, Request, RequestHandler, Response } from "express";
import User from "../models/User";

export const getUserByEmail: RequestHandler = async (req, res, next) => {
  try {
    const { email } = req.params;

    if (!email) {
      return res.status(401).json({});
    }

    const user = await User.findOne({ email });
    res.status(200).json({
      type: "success",
      message: "Fetch the user",
      user: user,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllUsers: RequestHandler = async (req, res, next) => {
  try {
    const allUsers = await User.find().exec();
    res.status(200).json({
      type: "success",
      message: "Fetched all the users",
      users: allUsers,
    });
  } catch (error) {
    next(error);
  }
};
