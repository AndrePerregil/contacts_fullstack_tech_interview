import { instanceToPlain } from "class-transformer";
import AppDataSource from "../../data-source";
import { Contact } from "../../entities/contacts.entity";

const readAllContactsService = async (id: string) => {
  const contactRepo = AppDataSource.getRepository(Contact);
  const allContacts = await contactRepo.find();
  const userContacts = allContacts.filter((el) => el.user.id == id);
  return instanceToPlain(userContacts);
};

export default readAllContactsService;
