import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";

import detectEthereumProvider from '@metamask/detect-provider';

import "../../styles/components/logInCard.css"

import MetamaskLogo from "../../resources/metamaskLogo.svg";
import CoinbaseLogo from "../../resources/coinbaseLogo.svg";

import LogInButtons from "./LogInButtons";
import LogInPending from "./LogInPending";
import LogInAccounts from "./LogInAccounts";
import UserWelcome from '../UserWelcome';

function LogInCard(){

    

    const [statusOfTheProcess, setStatusOfTheProcess] = useState(null);
    const [currentAccount, setCurrentAccount] = useState(null);
    
    const [stateButtons, setStateButtons] = useState(true);
    const [stateLogInAction, setStateLogInAction] = useState(true);
    
    const setterStateButtons = (value) => {
        setStateButtons(value);
    }

    const setterStateLogInAction = (value) => {
        setStateLogInAction(value);
    }

    const setterCurrentAccount = (value) => {
        setCurrentAccount(value);
    }

    const navigate = useNavigate();
    const homeScreen = () => {
        navigate("/");
    }

    return(
        <>
            <div className='loginCardContainer'>
                <div>
                    <h2 className='logInHead'>Log In</h2>
                </div>
                {stateButtons ?
                    <LogInButtons 
                        setterStateButtons = {setterStateButtons}
                        setterStateLogInAction = {setterStateLogInAction}
                        setterCurrentAccount = {setterCurrentAccount}
                        currentAccount = {currentAccount}
                    />
                    :
                       (stateLogInAction ?
                            <LogInPending/> 
                            :
                            <Navigate to="/welcome"/>
                       )
                }
            </div>
        </>
    );  
}

export default LogInCard;