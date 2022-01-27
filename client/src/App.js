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
import "./App.css";

const App = () => (
  <Router>
    <Fragment>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/register" className="container" element={<Register />} />
        <Route path="/login" className="container" element={<Login />} />
      </Routes>
    </Fragment>
  </Router>
);
export default App;
