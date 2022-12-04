import AppDataSource from "../../data-source";
import { instanceToPlain } from "class-transformer";

import { IUserProfileRequest } from "../../interfaces/users";

import { AppError } from "../../errors/AppError";

import { User } from "../../entities/users.entity";
import { Phone } from "../../entities/phones.entity";
import { Email } from "../../entities/emails.entity";

const createUserProfileService = async (
  userId: string,
  { phones, emails }: IUserProfileRequest
) => {
  const userRepo = AppDataSource.getRepository(User);
  const phoneRepo = AppDataSource.getRepository(Phone);
  const emailRepo = AppDataSource.getRepository(Email);

  const user = await userRepo.findOne({ where: { id: userId } });
  if (!user) {
    throw new AppError(404, "User not found");
  }

  const userPhones: Phone[] = [];
  if (phones) {
    const phoneCreationCb = async (phone: string) => {
      let newPhone = await phoneRepo.findOne({ where: { content: phone } });
      if (!newPhone) {
        newPhone = phoneRepo.create({
          content: phone,
        });
        await phoneRepo.save(newPhone);
      }
      userPhones.push(newPhone);
    };
    phones?.forEach((phone) => phoneCreationCb(phone));
  }

  const userEmails: Email[] = [];
  if (emails) {
    const emailCreationCb = async (email: string) => {
      let newEmail = await emailRepo.findOne({ where: { content: email } });
      if (!newEmail) {
        newEmail = emailRepo.create({
          content: email,
        });
        await emailRepo.save(newEmail);
      }
      userEmails.push(newEmail);
    };
    emails?.forEach((email) => emailCreationCb(email));
  }

  user.phones = phones ? userPhones : user.phones;
  user.emails = emails ? userEmails : user.emails;
  await userRepo.save(user);

  return instanceToPlain(user);
};

export default createUserProfileService;
