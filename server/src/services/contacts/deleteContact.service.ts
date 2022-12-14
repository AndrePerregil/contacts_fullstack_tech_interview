import AppDataSource from "../../data-source";
import { Contact } from "../../entities/contacts.entity";
import { AppError } from "../../errors/AppError";

const deleteContactService = async (id: string) => {
  const contactRepo = AppDataSource.getRepository(Contact);
  const contactToDelete = await contactRepo.findOne({ where: { id: id } });
  if (!contactToDelete) {
    throw new AppError(404, "Contact not found");
  }

  await contactRepo.delete(contactToDelete.id);
};

export default deleteContactService;
