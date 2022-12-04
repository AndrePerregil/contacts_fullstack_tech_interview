import AppDataSource from "../../data-source";
import { AppError } from "../../errors/AppError";
import { hash } from "bcryptjs";

import { IUserPatch } from "../../interfaces/users";

import { User } from "../../entities/users.entity";

const updateUserService = async ({
  id,
  username,
  password,
}: IUserPatch): Promise<User> => {
  const userRepo = AppDataSource.getRepository(User);

  const user = await userRepo.findOne({ where: { id: id } });
  if (!user) {
    throw new AppError(404, "User not found");
  }

  if (username) {
    const usernameAlreadyExists = await userRepo.findOne({
      where: { username: username },
    });
    if (usernameAlreadyExists) {
      throw new AppError(409, "Username already taken");
    }
  }

  let hashedPassword;
  if (password) {
    hashedPassword = await hash(password, 10);
  }

  const userNewData = {
    username: username ? username : user.username,
    password: password ? hashedPassword : user.password,
  };

  const noChanges = await userRepo.findOne({
    where: {
      username: userNewData.username,
      password: userNewData.password,
    },
  });

  if (noChanges) {
    throw new AppError(
      400,
      "Not possible to update an user without making any changes"
    );
  }

  await userRepo.update(id, userNewData);
  const userUpdated = await userRepo.findOne({ where: { id: id } });

  return userUpdated!;
};

export default updateUserService;
