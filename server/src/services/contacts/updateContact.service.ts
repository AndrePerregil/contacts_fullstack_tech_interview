import AppDataSource from "../../data-source";
import { AppError } from "../../errors/AppError";

import {
  IContactRequestPatch,
  IContactPatchData,
} from "../../interfaces/contacts";

import { Contact } from "../../entities/contacts.entity";
import { User } from "../../entities/users.entity";
import { Email } from "../../entities/emails.entity";
import { Phone } from "../../entities/phones.entity";
import { CannotAttachTreeChildrenEntityError } from "typeorm";

const updateContactService = async (
  userId: string,
  id: string,
  { name, phones, emails }: IContactRequestPatch
) => {
  const contactRepo = AppDataSource.getRepository(Contact);
  const userRepo = AppDataSource.getRepository(User);
  const phoneRepo = AppDataSource.getRepository(Phone);
  const emailRepo = AppDataSource.getRepository(Email);

  const contact = await contactRepo.findOne({ where: { id: id } });
  if (!contact) {
    throw new AppError(404, "contact not found");
  }

  const user = await userRepo.findOne({ where: { id: userId } });
  if (!user) {
    throw new AppError(404, "User not found");
  }

  if (name) {
    const nameAlreadyExists = await contactRepo.findOne({
      where: { name: name, user: user },
    });
    if (nameAlreadyExists) {
      throw new AppError(409, `There's already a ${name} in your contact list`);
    }
  }

  let contactEmails: Email[] = [];
  if (emails) {
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
    emails.forEach((email) => emailCreationCb(email));
  }

  let contactPhones: Phone[] = [];
  if (phones) {
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
    phones.forEach((phone) => phoneCreationCb(phone));
  }

  contact.name = name ? name : contact.name;
  contact.phones = phones ? contactPhones : contact.phones;
  contact.emails = emails ? contactEmails : contact.emails;

  const contactUpdated = await contactRepo.save(contact);
  return contactUpdated;
};

export default updateContactService;
