import { Request, Response } from "express";
import { AppError } from "../../errors/AppError";

import updateContactService from "../../services/contacts/updateContact.service";

const updateContactController = async (req: Request, res: Response) => {
  try {
    const { userId } = req;
    const { name, phones, emails } = req.body;
    const { id } = req.params;

    const contact = await updateContactService(userId!, id, {
      name,
      phones,
      emails,
    });

    return res.status(200).json({ data: { ...contact, user: userId } });
  } catch (err) {
    if (err instanceof AppError) {
      throw new AppError(err.statusCode, err.message);
    }
  }
};

export default updateContactController;
