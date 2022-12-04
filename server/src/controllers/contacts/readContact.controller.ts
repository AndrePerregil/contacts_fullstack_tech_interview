import { Response, Request } from "express";
import { AppError } from "../../errors/AppError";

import readContactService from "../../services/contacts/readContact.service";

const readContactController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { userId } = req;
    const contact = await readContactService(id);

    return res.status(200).json({
      data: { ...contact, user: userId },
    });
  } catch (err) {
    if (err instanceof AppError) {
      throw new AppError(err.statusCode, err.message);
    }
  }
};

export default readContactController;
