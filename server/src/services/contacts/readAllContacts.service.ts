import AppDataSource from "../../data-source";
import { Contact } from "../../entities/contacts.entity";

const readAllContactsService = async (id: string): Promise<Contact[]> => {
  const contactRepo = AppDataSource.getRepository(Contact);
  const allContacts = await contactRepo.find();
  const userContacts = allContacts.filter((el) => el.user.id == id);
  return userContacts;
};

export default readAllContactsService;
