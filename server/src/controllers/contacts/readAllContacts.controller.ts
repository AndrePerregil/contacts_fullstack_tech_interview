import { Request, Response } from "express";
import { AppError } from "../../errors/AppError";

import readAllContactsService from "../../services/contacts/readAllContacts.service";

const readAllContactsController = async (req: Request, res: Response) => {
  try {
    const { userId } = req;
    const contacts = await readAllContactsService(userId!);
    return res.json({ data: contacts });
  } catch (err) {
    if (err instanceof AppError) {
      throw new AppError(err.statusCode, err.message);
    }
  }
};

export default readAllContactsController;
