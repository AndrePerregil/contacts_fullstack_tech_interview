import { Express } from "express";

import userRoutes from "./users.routes";
import contactRoutes from "./contacts.routes";

const appRoutes = (app: Express) => {
  app.use("/users/", userRoutes());
  app.use("/contacts/", contactRoutes());
};

export default appRoutes;
