import { Request, Response, NextFunction } from "express";
import AppDataSource from "../../data-source";
import { AppError } from "../../errors/AppError";

import { User } from "../../entities/users.entity";
import { Contact } from "../../entities/contacts.entity";
import { Phone } from "../../entities/phones.entity";
import { Email } from "../../entities/emails.entity";

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
  const userFromToken = await userRepo.findOneBy({ id: userId });

  if (!userFromToken) {
    throw new AppError(404, "User not found");
  }

  if (route[1] === "users") {
    const userAffected = await userRepo.findOne({ where: { id: id } });
    if (!userAffected) {
      throw new AppError(404, "User not found");
    }

    const isOwner = userAffected.id != userFromToken.id;

    if (isOwner) {
      throw new AppError(
        401,
        "Only the owner of the account is allowed to make any changes"
      );
    }
    return next();
  }

  //to do other routes here
};

export default authenticateOwnershipMiddleware;
