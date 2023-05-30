import { combineReducers } from "redux";
import branchReducer from "./Branch/branchReducer";
import basket from "./basket/reducers";
import user from "./user/userReducers";

export default combineReducers({
  branch: branchReducer,
  basket,
  user,
});
