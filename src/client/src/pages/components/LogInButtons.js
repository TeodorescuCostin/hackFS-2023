import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import detectEthereumProvider from '@metamask/detect-provider';

import "../../styles/components/logInCard.css"

import MetamaskLogo from "../../resources/metamaskLogo.svg";
import CoinbaseLogo from "../../resources/coinbaseLogo.svg";


function LogInButtons({setterStateButtons, setterStateLogInAction, setterCurrentAccount, currentAccount}){

    const [provider, setProvider] = useState(null);

    // Connect to Metamask

    const connectMetamask = async () => {
      setterStateButtons(false);
      try {
        const detectedProvider = await detectEthereumProvider();
        if (detectedProvider) {
          await detectedProvider.request({ method: "wallet_requestPermissions", params: [{ eth_accounts: {} }] });
          setProvider(detectedProvider);
          setterStateLogInAction(false);
        } else {
          alert("Please install Metamask to use this feature.");
        }
      } catch (error) {
        console.error(error);
        alert("Failed to connect to Metamask.");
      }
    };

    // Connect to Coinbase
    

    return(
        <>
            <div className='buttonsContainer'>
                <button className='buttonMetamask' onClick={connectMetamask}>
                    <img src={MetamaskLogo} className='metamaskLogo'></img>
                </button>
                <button className='buttonCoinbase'>
                    <img src={CoinbaseLogo} className='coibaseLogo'></img>
                </button>
            </div>
        </>
    );  
}

export default LogInButtons;