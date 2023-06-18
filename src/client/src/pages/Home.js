import React, { useState, useEffect } from "react";

import Header from "./components/Header";
import Hero from './components/Hero';
import GetInTouch from './components/GetInTouch';
import GetStarted from './components/GetStarted';

function Home() {
  const [users, setUsers] = useState([]);

//   useEffect(() => {
//     fetch("/api/users")
//       .then(res => res.json())
//       .then(json => setUsers(json.users));
//     // Specify how to clean up after this effect:
//     return () => {};
//   }, []); // empty 2nd arg - only runs once

  return (
    <>
        <Header />
        <Hero />
        <GetStarted />
        <GetInTouch />
    </>
  );
}

export default Home;
