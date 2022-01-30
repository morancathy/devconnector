//this is boiler plate for store files...just bring in fucntion called create store and pass things into it

import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk"; //middleware so need to bring in applyMiddleware
import rootReducer from "./reducers"; //will have multiple reducers, but will combine them in a rootReducer. which is inside a folder reducers and inside it's index.js, and since its index.js, can simply call it from ./reducers

const initialState = {}; //all initial state will be in the reducers

const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);
//since using devToolsExtension we can use composeWithDevTools that takes in apply middleware

export default store;
