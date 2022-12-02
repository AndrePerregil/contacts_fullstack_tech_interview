import { Request, Response } from "express";
import { AppError } from "../../errors/AppError";

import deleteUserService from "../../services/users/deleteUser.service";

const deleteUserController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await deleteUserService(id);

    return res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    if (err instanceof AppError) {
      throw new AppError(err.statusCode, err.message);
    }
  }
};

export default deleteUserController;
