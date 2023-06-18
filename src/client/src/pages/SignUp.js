import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import "../App.css";

// import components
import Header from "./components/Header"
import SignUpCard from "./components/SignUpCard"

function SignUp() {
  const [users, setUsers] = useState([]);

  return (
    <>
        <Header />
        <SignUpCard />
        
    </>
  );
}

export default SignUp;
