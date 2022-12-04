import AppDataSource from "../../data-source";
import { instanceToPlain } from "class-transformer";

import { IContactRequest } from "../../interfaces/contacts";

import { AppError } from "../../errors/AppError";

import { User } from "../../entities/users.entity";
import { Contact } from "../../entities/contacts.entity";
import { Email } from "../../entities/emails.entity";
import { Phone } from "../../entities/phones.entity";

const createContactService = async ({
  name,
  userId,
  emails,
  phones,
}: IContactRequest) => {
  const userRepo = AppDataSource.getRepository(User);
  const contactRepo = AppDataSource.getRepository(Contact);
  const emailRepo = AppDataSource.getRepository(Email);
  const phoneRepo = AppDataSource.getRepository(Phone);

  const user = await userRepo.findOne({ where: { id: userId } });
  if (!user) {
    throw new AppError(404, "User not found");
  }

  const nameUnavailable = await contactRepo.findOne({
    where: { user: user, name: name },
  });
  if (nameUnavailable) {
    throw new AppError(401, `You already have a contact named ${name}`);
  }

  const contactEmails: Email[] = [];
  const emailCreationCb = async (email: string) => {
    let newEmail = await emailRepo.findOne({ where: { content: email } });
    if (!newEmail) {
      newEmail = emailRepo.create({
        content: email,
      });
      await emailRepo.save(newEmail);
    }
    contactEmails.push(newEmail);
  };
  emails?.forEach((email) => emailCreationCb(email));

  const contactPhones: Phone[] = [];
  const phoneCreationCb = async (phone: string) => {
    let newPhone = await phoneRepo.findOne({ where: { content: phone } });
    if (!newPhone) {
      newPhone = phoneRepo.create({
        content: phone,
      });
      await phoneRepo.save(newPhone);
    }
    contactPhones.push(newPhone);
  };
  phones?.forEach((phone) => phoneCreationCb(phone));

  const newContact = contactRepo.create({
    name: name,
    user: user,
  });
  newContact.phones = contactPhones;
  newContact.emails = contactEmails;
  await contactRepo.save(newContact);

  return instanceToPlain(newContact);
};

export default createContactService;
