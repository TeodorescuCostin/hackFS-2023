import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import detectEthereumProvider from '@metamask/detect-provider';

import "../../styles/components/logInCard.css"

import MetamaskLogo from "../../resources/metamaskLogo.svg";
import CoinbaseLogo from "../../resources/coinbaseLogo.svg";


function SignUpSection({setterStateProfile, setterStateProfileAction}){

    const [provider, setProvider] = useState(null);

    // Connect to Metamask

    const connectMetamask = async () => {
        setterStateProfile(false);
      try {
        const detectedProvider = await detectEthereumProvider();
        if (detectedProvider) {
          await detectedProvider.request({ method: "wallet_requestPermissions", params: [{ eth_accounts: {} }] });
          setProvider(detectedProvider);
          setterStateProfileAction(false);
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
                <form>
                <input className="searchBarCluster" type="image"/>
                    <input className="searchBarCluster" type="text" id="fname" name="clusterName" placeholder="Type Nickname"/>
                </form>
            </div>
        </>
    );  
}

export default SignUpSection;