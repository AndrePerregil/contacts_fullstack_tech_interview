import { Routes, Route } from "react-router-dom";

import Landing from "../pages/landing";
import Register from "../pages/register";
import Login from "../pages/login";
import Profile from "../pages/profile";
import Contacts from "../pages/contacts";
import CreateContacts from "../pages/createContact";

const Router = () => {
  return (
    <Routes>
      <Route path={"/"} element={<Landing />} />
      <Route path={"/register"} element={<Register />} />
      <Route path={"/login"} element={<Login />} />
      <Route path={"/profile"} element={<Profile />} />
      <Route path={"/contacts"} element={<Contacts />} />
      <Route path={"/create/contact"} element={<CreateContacts />} />
    </Routes>
  );
};

export default Router;
