import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import demo from "./demo";

export default history =>
  combineReducers({
    router: connectRouter(history),
    demo
  });
