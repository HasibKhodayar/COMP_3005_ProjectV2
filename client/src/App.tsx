import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Registration from "./pages/login/Registration";
import LogIn from "./pages/login/LogIn";
import Welcome from "./pages/Welcome";
import Home from "./pages/Home";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/logIn" element={<LogIn />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
