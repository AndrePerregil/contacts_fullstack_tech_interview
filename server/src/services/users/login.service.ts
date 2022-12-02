import AppDataSource from "../../data-source";
import { AppError } from "../../errors/AppError";
import { compareSync } from "bcryptjs";
import jwt from "jsonwebtoken";

import { User } from "../../entities/users.entity";

import { IUserRequest } from "../../interfaces/users";

const loginService = async ({ username, password }: IUserRequest) => {
  const userRepo = AppDataSource.getRepository(User);

  const user = await userRepo.findOne({ where: { username: username } });
  if (!user) {
    throw new AppError(401, "Invalid login credentials");
  }

  const passwordCheck = compareSync(password, user.password);
  if (!passwordCheck) {
    throw new AppError(401, "Invalid login credentials");
  }

  const token = jwt.sign({ id: user.id }, String(process.env.SECRET_KEY), {
    expiresIn: "24h",
  });

  return token;
};

export default loginService;
