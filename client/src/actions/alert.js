import uuid from "uuid";
import { SET_ALERT, REMOVE_ALERT } from "./types"; //will dispatch these which will call the case that we just put in the reducer

export const setAlert = (msg, alertType) => (dispatch) => {
  const id = uuid.v4();
  dispatch({
    type: SET_ALERT,
    payload: { msg, alertType, id },
  });
};
//want to dispatch more then one action type from this funciton, can do this because of FUNK middleware
