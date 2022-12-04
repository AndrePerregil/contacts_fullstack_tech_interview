import { Request, Response } from "express";
import { AppError } from "../../errors/AppError";

import deleteContactService from "../../services/contacts/deleteContact.service";

const deleteContactController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await deleteContactService(id);

    return res.status(200).json({ message: "contact deleted successfully" });
  } catch (err) {
    if (err instanceof AppError) {
      throw new AppError(err.statusCode, err.message);
    }
  }
};

export default deleteContactController;
