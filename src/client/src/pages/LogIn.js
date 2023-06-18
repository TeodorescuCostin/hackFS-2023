import React, { useState, useEffect } from "react";
import UserWelcome from "./UserWelcome";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import "../App.css";

// import components
import Header from "./components/Header"
import LogInCard from "./components/LogInCard"

function LogIn() {
  const [users, setUsers] = useState([]);

  return (
    <>
        <Header />
        <LogInCard />
        
    </>
  );
}

export default LogIn;
