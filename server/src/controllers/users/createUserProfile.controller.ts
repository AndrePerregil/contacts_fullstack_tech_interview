import { Request, Response } from "express";
import { AppError } from "../../errors/AppError";

import createUserProfileService from "../../services/users/createUserProfile.service";

const createUserProfileController = async (req: Request, res: Response) => {
  try {
    const { userId } = req;
    const { phones, emails } = req.body;

    const user = await createUserProfileService(userId!, { phones, emails });
    return res.status(200).json({ data: user });
  } catch (err) {
    if (err instanceof AppError) {
      throw new AppError(err.statusCode, err.message);
    }
  }
};

export default createUserProfileController;
