//root reducer
import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";

export default combineReducers({
  alert,
  auth,
});
//add the imported alert to the object that we pass into combineReducers
