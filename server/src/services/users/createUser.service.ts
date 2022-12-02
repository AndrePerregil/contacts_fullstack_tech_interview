import AppDataSource from "../../data-source";
import { hash } from "bcryptjs";
import { AppError } from "../../errors/AppError";
import { IUserRequest } from "../../interfaces/users";
import { User } from "../../entities/users.entity";

const createUserService = async ({
  username,
  password,
}: IUserRequest): Promise<User> => {
  const userRepo = AppDataSource.getRepository(User);

  const usernameAlreadyExists = await userRepo.findOneBy({
    username: username,
  });
  if (usernameAlreadyExists) {
    throw new AppError(409, "Username is already taken");
  }

  const hashedPassword = await hash(password, 10);

  const user = userRepo.create({
    username,
    password: hashedPassword,
  });
  await userRepo.save(user);

  return user;
};

export default createUserService;
