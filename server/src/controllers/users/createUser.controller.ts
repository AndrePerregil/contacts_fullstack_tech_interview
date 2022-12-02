import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import { AppError } from "../../errors/AppError";
import { IUserRequest } from "../../interfaces/users";

import createUserService from "../../services/users/createUser.service";

const createUserController = async (req: Request, res: Response) => {
  try {
    const { username, password }: IUserRequest = req.body;

    const user = await createUserService({ username, password });
    return res.status(201).json({
      message: "User created successfully",
      data: instanceToPlain(user),
    });
  } catch (err) {
    if (err instanceof AppError) {
      throw new AppError(err.statusCode, err.message);
    }
  }
};

export default createUserController;
