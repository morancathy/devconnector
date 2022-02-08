import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Alert from "./components/layout/Alert";
import Dashboard from "./components/dashboard/Dashboard";
import PrivateRoute from "./components/routing/PrivateRoute";

//Redux
import { Provider } from "react-redux"; //surround app with Provider
import store from "./store";
import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";

import "./App.css";

if (localStorage.token) {
  //sets the token to the header if there is one
  setAuthToken(localStorage.token);
} // allows us to check multiple times the user loads

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  //dispatch the loadUser action by taking in the store directly. and call dispatch (method on the store) and pass in loadUser

  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Alert />
        <Routes>
          <Route path="/" className="container" element={<Landing />} />
          <Route
            path="/register"
            className="container"
            element={<Register />}
          />
          <Route path="/login" className="container" element={<Login />} />
          <Route
            path="dashboard"
            element={<PrivateRoute component={Dashboard} />}
          />
          {/* <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route> */}
        </Routes>
      </Router>
    </Provider>
  );
};
export default App;
