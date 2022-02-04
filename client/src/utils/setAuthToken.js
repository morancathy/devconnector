//utils aka helper file. If there is a token we want to put it in a global header (with x-auth-token). if we have a token in local storage we want to always send that.

import axios from "axios"; //not making a request with axios, we are making a global header

const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common["x-auth-token"] = token;
  } else {
    delete axios.defaults.headers.common["x-auth-token"];
  }
};

export default setAuthToken;

//function takes in a token. if the token is there, it adds it to header, if it is not a token it deletes it from the headers. The header we want to set is 'x-auth-token' and set it to the token that is set in (line 7). We do this is so when we have a token we sent it with every request instead of picking and choosing which requests
