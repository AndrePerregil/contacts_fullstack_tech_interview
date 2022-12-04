import { Request, Response, NextFunction } from "express";
import AppDataSource from "../../data-source";
import { AppError } from "../../errors/AppError";

import { User } from "../../entities/users.entity";
import { Contact } from "../../entities/contacts.entity";
import { Phone } from "../../entities/phones.entity";
import { Email } from "../../entities/emails.entity";
import { checkPrime } from "crypto";

const authenticateOwnershipMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req;
  const route = req.originalUrl.split("/");
  const { id } = req.params;

  if (!id) {
    throw new AppError(400, "Missing ID param on route");
  }

  const userRepo = AppDataSource.getRepository(User);
  const contactRepo = AppDataSource.getRepository(Contact);

  const userFromToken = await userRepo.findOneBy({ id: userId });
  if (!userFromToken) {
    throw new AppError(404, "User not found");
  }

  if (route[1] === "users") {
    const userAffected = await userRepo.findOne({ where: { id: id } });
    if (!userAffected) {
      throw new AppError(404, "User not found");
    }

    const notOwner = userAffected.id != userFromToken.id;

    if (notOwner) {
      throw new AppError(
        401,
        "Only the owner of the account is allowed to make any changes"
      );
    }
    return next();
  }
  if (route[1] === "contacts") {
    const contact = await contactRepo.findOne({ where: { id: id } });
    if (!contact) {
      throw new AppError(404, "Contact not found");
    }

    const notOwner = contact.user.id != userFromToken.id;
    if (notOwner) {
      throw new AppError(
        401,
        "only the owner of the account is allowed to make any changes"
      );
    }
    return next();
  }
  return next();
};

export default authenticateOwnershipMiddleware;
