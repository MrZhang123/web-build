import loadable from "react-loadable";
import Loading from "../../components/Loading";

const loadableComponent = loader => {
  return loadable({
    loader,
    loading: Loading
  });
};

const routes = [
  {
    path: "/",
    exact: true,
    component: loadableComponent(() => import("./Home"))
  },
  {
    path: "/about",
    component: loadableComponent(() => import("./About"))
  },
  {
    path: "/topics",
    component: loadableComponent(() => import("./Topics"))
  }
];

export default routes;
