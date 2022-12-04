import AppDataSource from "../../data-source";
import { Contact } from "../../entities/contacts.entity";
import { AppError } from "../../errors/AppError";

const readContactService = async (id: string): Promise<Contact> => {
  const contactRepo = AppDataSource.getRepository(Contact);
  const contact = await contactRepo.findOne({
    where: {
      id: id,
    },
  });

  if (!contact) {
    throw new AppError(404, "Contact not found");
  }
  return contact;
};

export default readContactService;
