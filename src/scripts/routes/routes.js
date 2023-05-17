import { detail, favorite, home } from "../views/pages";

const routes = {
  "/": home,
  "/detail/:id": detail,
  "/favorite": favorite,
  "/about-us": () => {
    window.open("#");
  },
};

export default routes;
