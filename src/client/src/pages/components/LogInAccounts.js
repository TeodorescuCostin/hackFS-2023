import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import detectEthereumProvider from '@metamask/detect-provider';
import { ethers } from "ethers"

import nftABI from '../../abi/profile.json';
import "../../styles/components/logInCard.css"

function LogInAccounts(){

    const [accounts, setAccounts] = useState([])
    // 0x679919C3E3eeAef469AA5A8DAfc381332bA39a73 
    
    const nftContractAddress = '0x71B8DDD88a45faedA84Ddd66CaC8eBAeCDA8195D';

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(nftContractAddress, nftABI, signer);
   
    useEffect(() => {
        if(contract.getUsersForWallet().length){
            async function getAllMintedTokens() {

                const tokenData = [];
    
                try {
                    // apeleaza functia din contract
                    const totalSupplyInHex = await contract.totalSupply();

                    const hexToDecimal = hex => parseInt(hex, 16);
                    const totalSupply = hexToDecimal(totalSupplyInHex._hex)
    
                    for (let i = totalSupply; i => 1; i--) {
                        const item ={
                            name: "",
                            cid: "",
                            owner: "",   
                            displayname: "" 
                        }
    
                        // toata descrierea (tokenURI)
                        const token = await contract.getTokenURI(i); 
                        const tokenURI = JSON.parse(token)
    
                        // path fisierului
                        item.cid = tokenURI.description;
    
                        item.name = tokenURI.fileName;
                        if(item.name.length > 30) item.displayname = item.name.slice(0,30) + "...";
                        else item.displayname = item.name;
    
                        item.owner = tokenURI.owner;
                        tokenData.push(item);
                    }
                } catch (error) {
                    console.log('Error fetching file from IPFS', error);
                    }
                    setAccounts(tokenData);
                }
                getAllMintedTokens().catch(console.error);

        }

    },[])
    

    return(
        <>
            <div className='buttonsContainer'>
                <p className='accountDetails'>Account: 0x24C2e8937C45D84bE31177c912BE6D13335200a3</p>
                {
                    accounts.map((item, index) => {
                        return (
                          <div key={index} className='sectionRow'>
                            <img className='icon'  width="50" height="50" src="https://gateway.ipfs.io/ipfs/QmXV7H69RK25Z71refnHGSkSsYUtgvQp5fw7Eo2CMyjnox"/>
                            <p className='name'>{item.nickName}</p>
                          </div>
                        )
                      })
                }
            </div>
        </>
    );  
}

export default LogInAccounts;