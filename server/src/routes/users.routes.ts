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
import validateProfileCreation from "../middlewares/users/validateProfileCreation.middleware";

import createUserSchema from "../schemas/users/createUser.schema";
import updateUserSchema from "../schemas/users/updateUser.schema";
import createProfileSchema from "../schemas/users/createProfile.schema";
import createUserProfileController from "../controllers/users/createUserProfile.controller";

const routes = Router();

const userRoutes = () => {
  routes.post("", validateUserCreation(createUserSchema), createUserController);
  routes.get("", authenticateUserMiddleware, readUserController);
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
  routes.post(
    "/profile",
    authenticateUserMiddleware,
    validateProfileCreation(createProfileSchema),
    createUserProfileController
  );
  return routes;
};

export default userRoutes;
