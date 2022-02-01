//alert reducers. Funciton that takes in state( that has to do with alerts) and an action. An action will get dispated from an actions file

import { SET_ALERT, REMOVE_ALERT } from "../actions/types";

const initialState = []; //this only pertains to alerts

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_ALERT: //we dispatch this type (set_alert)
      return [...state, payload]; //we return the array with the payload(new alert). adds a new alert to the array
    case REMOVE_ALERT:
      return state.filter((alert) => alert.id !== payload); //returns all alerts execpt for the one that matches the payload
    default:
      return state;
  }
}

//action takes in 2 things. 1 is maditory, which is a type. 2nd is the payload (data). The type is what we need to evaluate. Action is an obhect that will have a type attached to it, which we need to evaluate.
