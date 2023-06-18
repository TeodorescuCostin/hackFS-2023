import React, { useState, useEffect } from "react";
import moduleName from 'module';
import '../styles/UserWelcome.css'
import '../styles/header.css'
import logo from '../resources/logoText.svg' 
import userPic from '../resources/user.svg'
import menu from '../resources/menu.svg'
import Paper from './components/Paper.js'
import MyClusters from './components/MyClusters.js'
import { useNavigate } from "react-router-dom";
import Web3 from 'web3';
import FileUpload from "./components/FileUpload";
import { ethers } from "ethers"  

import abi from '../abi/scepter.json';

function UserWelcome()
{
    const [users, setUsers] = useState([]);
    const [walletAddress, setWalletAddress] = useState('');
    const [paperObjects, setPaperObjects] = useState([]);
    const [userClusters, setUserClusters] = useState([]);

    const navigate = useNavigate();
    const homeScreen = () => {
      navigate("/");
    }

  useEffect(() => {
    const getWalletAddress = async () => {
      // Modern dapp browsers
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        try {
          // Request account access if needed
          await window.ethereum.enable();
          // Get the wallet addresses
          const accounts = await web3.eth.getAccounts();
          // Set the wallet address state
          setWalletAddress(accounts[0]);
          return accounts[0];
        } catch (error) {
          console.error(error);
        }
      }
      // Legacy dapp browsers
      else if (window.web3) {
        const web3 = new Web3(window.web3.currentProvider);
        // Get the wallet addresses
        const accounts = await web3.eth.getAccounts();
        // Set the wallet address state
        setWalletAddress(accounts[0]);
      }
      // Non-dapp browsers
      else {
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
      }
    };

    async function getAllFilesForUser() {

      const wallet = await getWalletAddress();
      const nftContractAddress = '0xAA3668F42ED1c7Ba0bDadee69Aaf68Ba5317Ea8c';

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(nftContractAddress, abi, signer);

      
      // Get users clusters
      try {
        const userClusters = await contract.getUserCluster(wallet);

        setUserClusters(userClusters);
        const objects = []
        for(var i=0; i< userClusters.length; i++) {

          // Get files from cluster userClusters[i]
          const filesFromCluster = await contract.getFiles(userClusters[i]['_hex']);
          for(var j=0; j < filesFromCluster.length; j++) {
            //number = "12" points = "123" path = "0x234134211324ADF" author="23457890-0987654"
            const fileObject = {
              fileName: "",
              number: "",
              points: "",
              path: "",
              author: "",
              clusterId: userClusters[i]['_hex'],
              index: j
            }

            fileObject.author = filesFromCluster[j].creator;
            fileObject.fileName = filesFromCluster[j].fileName;
            fileObject.number = j;
            fileObject.points = parseInt(filesFromCluster[j].numberOfVotes['_hex'], 16);
            fileObject.path = filesFromCluster[j].ipfsHash;

            objects.push(fileObject);
          }
        }
        setPaperObjects(objects.reverse());
        
      } catch (error) {
        console.error(error);
      }
    }

    getAllFilesForUser()
    getWalletAddress();
  }, []);   

    /*useEffect(() => {
    fetch("/api/users")
      .then(res => res.json())
      .then(json => setUsers(json.users));
    // Specify how to clean up after this effect:
    return () => {};
    }, []); // empty 2nd arg - only runs once*/
    return (
        <div className = "UserWelcome">
            <header className ="header">
                <a><img src={logo} alt="logo" className="logo" onClick={homeScreen}></img></a>
                <div className="userSettings">
                    <a style={{display: 'inline-block'}}> <img src={userPic} alt="logo" className="userPic"></img></a>
                    <a style={{display: 'inline-block'}}><img src={menu} alt = "details" className="userPic"></img> </a>
                </div>
            </header>
            <div style={{display: 'flex', alignItems: 'center'}}>
            <div className="content">
                <h1 className="welcomeMessage"> Welcome, {walletAddress}!</h1>
                <form>
                    <input className="searchBar" type="text" id="fname" name="fname" placeholder="Search..."/>
                    <div>
                    <select className = "orderBy" name="orderBy" defaultValue="orderBy">
                        <option value="orderBy" disabled >Order By...</option>
                        <option value="points">Points</option>
                        <option value="date">Date</option>
                </select>
                <input className="search" type="submit" value="Search"></input>
                </div>
                </form>
                <div className="paperArea" style={{ overflowY: 'scroll',minHeight: '460px', maxHeight: '460px', marginTop: '10px', marginBottom: '8px', borderRadius: '8px'}}>
                  { 
                    paperObjects.map((item, index) => {
                      return(
                        <Paper key={index} fileName={item.fileName} number={item.number}
                               points={item.points} path={item.path} author={item.author}
                               clusterId={item.clusterId} index={item.index}/>
                      )
                    })
                  }
                </div>
            </div>
            <div className="divv">
                <MyClusters clusters = {userClusters} walletAddress={walletAddress}/>
                <FileUpload clusters = {userClusters} walletAddress={walletAddress}/>
                </div>
            </div>
        </div>
    )
}


export default UserWelcome;