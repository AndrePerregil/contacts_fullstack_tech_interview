import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import { AppError } from "../../errors/AppError";

import { IUserPatch } from "../../interfaces/users";

import updateUserService from "../../services/users/updateUser.service";

const updateUserController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { username, password }: IUserPatch = req.body;

    const user = await updateUserService({ id, username, password });

    return res
      .status(200)
      .json({ message: "User updated", data: instanceToPlain(user) });
  } catch (err) {
    if (err instanceof AppError) {
      throw new AppError(err.statusCode, err.message);
    }
  }
};

export default updateUserController;
