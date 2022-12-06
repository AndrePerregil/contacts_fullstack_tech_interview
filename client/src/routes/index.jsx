import { Routes, Route } from "react-router-dom";

import Landing from "../pages/landing";
import Register from "../pages/register";
import Login from "../pages/login";

const Router = () => {
  return (
    <Routes>
      <Route path={"/"} element={<Landing />} />
      <Route path={"/register"} element={<Register />} />
      <Route path={"/login"} element={<Login />} />
    </Routes>
  );
};

export default Router;
