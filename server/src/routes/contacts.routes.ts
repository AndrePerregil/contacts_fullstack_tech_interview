import { Router } from "express";

import createContactController from "../controllers/contacts/createContact.controller";
import deleteContactController from "../controllers/contacts/deleteContact.controller";
import readAllContactsController from "../controllers/contacts/readAllContacts.controller";
import readContactController from "../controllers/contacts/readContact.controller";
import updateContactController from "../controllers/contacts/updateContacts.controller";

import authenticateOwnershipMiddleware from "../middlewares/authentications/authenticateOwnership.middleware";
import authenticateUserMiddleware from "../middlewares/authentications/authenticateUser.middleware";
import validateContactCreation from "../middlewares/contacts/validateContactCreation.middleware";
import validateContactUpdate from "../middlewares/contacts/validateContactUpdate.middleware";

import createContactSchema from "../schemas/contacts/createContact.schema";
import updateContactSchema from "../schemas/contacts/updateContact.schema";

const routes = Router();

const contactRoutes = () => {
  routes.post(
    "",
    authenticateUserMiddleware,
    validateContactCreation(createContactSchema),
    createContactController
  ),
    routes.get("", authenticateUserMiddleware, readAllContactsController);
  routes.get(
    "/:id",
    authenticateUserMiddleware,
    authenticateOwnershipMiddleware,
    readContactController
  );
  routes.patch(
    "/:id",
    authenticateUserMiddleware,
    authenticateOwnershipMiddleware,
    validateContactUpdate(updateContactSchema),
    updateContactController
  );
  routes.delete(
    "/:id",
    authenticateUserMiddleware,
    authenticateOwnershipMiddleware,
    deleteContactController
  );
  return routes;
};

export default contactRoutes;
