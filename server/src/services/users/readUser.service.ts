import AppDataSource from "../../data-source";
import { User } from "../../entities/users.entity";
import { AppError } from "../../errors/AppError";

const readUserService = async (id: string): Promise<User> => {
  const userRepo = AppDataSource.getRepository(User);
  const user = await userRepo.findOne({
    where: {
      id: id,
    },
  });

  if (!user) {
    throw new AppError(404, "User not found");
  }
  return user;
};

export default readUserService;
