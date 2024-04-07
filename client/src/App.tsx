import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';

import Registration from './pages/login/Registration';
import LogIn from './pages/login/LogIn';
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/logIn" element={<LogIn />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
