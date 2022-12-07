import { instanceToPlain } from "class-transformer";
import { Response, Request } from "express";
import { AppError } from "../../errors/AppError";

import readUserService from "../../services/users/readUser.service";

const readUserController = async (req: Request, res: Response) => {
  try {
    const { userId } = req;
    const user = await readUserService(userId!);

    return res.status(200).json({
      data: instanceToPlain(user),
    });
  } catch (err) {
    if (err instanceof AppError) {
      throw new AppError(err.statusCode, err.message);
    }
  }
};
export default readUserController;
