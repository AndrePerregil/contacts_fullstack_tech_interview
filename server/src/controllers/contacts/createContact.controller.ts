import { Request, Response } from "express";
import { AppError } from "../../errors/AppError";

import createContactService from "../../services/contacts/createContact.service";

const createContactController = async (req: Request, res: Response) => {
  try {
    const { phones, emails, name } = req.body;
    const { userId } = req;

    if (!userId) {
      throw new AppError(400, "Missing or invalid authorization Token");
    }

    const newContact = await createContactService({
      phones,
      emails,
      name,
      userId,
    });

    return res
      .status(201)
      .json({ message: "Contact created successfully", data: newContact });
  } catch (err) {
    if (err instanceof AppError) {
      throw new AppError(err.statusCode, err.message);
    }
  }
};

export default createContactController;
