import { Router } from "express";

import createUserController from "../controllers/users/createUser.controller";
import deleteUserController from "../controllers/users/deleteUser.controller";
import loginController from "../controllers/users/login.controller";
import readUserController from "../controllers/users/readUser.controller";
import updateUserController from "../controllers/users/updateUser.controller";

import authenticateOwnershipMiddleware from "../middlewares/authentications/authenticateOwnership.middleware";
import authenticateUserMiddleware from "../middlewares/authentications/authenticateUser.middleware";
import validateUserCreation from "../middlewares/users/validateUserCreation.middleware";
import validateUserUpdate from "../middlewares/users/validateUserUpdate.middleware";

import createUserSchema from "../schemas/users/createUser.schema";
import updateUserSchema from "../schemas/users/updateUser.schema";

const routes = Router();

const userRoutes = () => {
  routes.post("", validateUserCreation(createUserSchema), createUserController);
  routes.get(
    "/:id",
    authenticateUserMiddleware,
    authenticateOwnershipMiddleware,
    readUserController
  );
  routes.patch(
    "/:id",
    authenticateUserMiddleware,
    authenticateOwnershipMiddleware,
    validateUserUpdate(updateUserSchema),
    updateUserController
  );
  routes.delete(
    "/:id",
    authenticateUserMiddleware,
    authenticateOwnershipMiddleware,
    deleteUserController
  );
  routes.post(
    "/login",
    validateUserCreation(createUserSchema),
    loginController
  );
  return routes;
};

export default userRoutes;
