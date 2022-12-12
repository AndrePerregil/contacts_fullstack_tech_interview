import { Request, Response } from "express";
import { AppError } from "../../errors/AppError";

import loginService from "../../services/users/login.service";
import { IUserRequest } from "../../interfaces/users";

const loginController = async (req: Request, res: Response) => {
  try {
    const { username, password }: IUserRequest = req.body;
    const token = await loginService({ username, password });

    return res.status(200).json({
      message: "Login successful",
      data: token,
    });
  } catch (err) {
    if (err instanceof AppError) {
      throw new AppError(err.statusCode, err.message);
    }
  }
};

export default loginController;
