//root reducer
import { combineReducers } from "redux";
import alert from "./alert";

export default combineReducers({
  alert,
});
//add the imported alert to the object that we pass into combineReducers
