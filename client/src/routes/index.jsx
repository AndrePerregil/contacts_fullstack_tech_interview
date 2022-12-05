import { Routes, Route } from "react-router-dom";

import Landing from "../pages/landing";

const Router = () => {
  return (
    <Routes>
      <Route path={"/"} element={<Landing />} />
    </Routes>
  );
};

export default Router;
