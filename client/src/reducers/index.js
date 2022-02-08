//root reducer
import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import profiles from "./profiles";

export default combineReducers({
  alert,
  auth,
  profiles,
});
//add the imported alert to the object that we pass into combineReducers
