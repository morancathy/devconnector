import { v4 as uuidv4 } from "uuid";
import { SET_ALERT, REMOVE_ALERT } from "./types"; //will dispatch these which will call the case that we just put in the reducer

export const setAlert = (msg, alertType) => (dispatch) => {
  const id = uuidv4();
  dispatch({
    //this is the action (i believe)
    type: SET_ALERT,
    payload: { msg, alertType, id },
  });
};
//want to dispatch more then one action type from this funciton, can do this because of FUNK middleware

//we have an action called setAlert that will dispatch the TYPE of setAlert to the alert reducer.
