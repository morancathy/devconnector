import React, { Fragment } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Switch,
} from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
//Redux
import { Provider } from "react-redux"; //surround app with Provider
import store from "./store";

import "./App.css";

const App = () => (
  <Provider store={store}>
    <Router>
      <Fragment>
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route
            path="/register"
            className="container"
            element={<Register />}
          />
          <Route path="/login" className="container" element={<Login />} />
        </Routes>
      </Fragment>
    </Router>
  </Provider>
);
export default App;
