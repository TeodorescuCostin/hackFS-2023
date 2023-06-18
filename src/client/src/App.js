
import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

import "./App.css";
import Home from './pages/Home';
import LogIn from './pages/LogIn';
import SignUp from './pages/SignUp';
import UserWelcome from './pages/UserWelcome';

function App() {
  const [users, setUsers] = useState([]);

  return (
    <>
      <Routes>
        <Route path ="/" element={<Home />} />
        <Route path ="/signIn" element={<LogIn />} />
        {/* <Route path ="/signUp" element={<SignUp />} /> */}
        <Route path ="/welcome" element = {<UserWelcome/>}/>
      </Routes>
    </>
  );
}

export default App;