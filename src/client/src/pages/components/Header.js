import React from 'react';
import { useNavigate } from "react-router-dom";
import "../../styles/components/header.css"
import Logo from "../../resources/logoText.svg"

function Header(){

    const navigate = useNavigate();

    const homeScreen = () => {
        navigate("/");
    }

    const signUp = () => {
        navigate("/signIn");
    }

    return(
        <>
            <div className='headerContainer'>
                <div class="logo-container">
                    <img src={Logo} className='logo' onClick={homeScreen}></img>
                </div>
                <button className='signUpButton' onClick={signUp}>Sign In</button>
            </div>
        </>
    );  
}

export default Header;