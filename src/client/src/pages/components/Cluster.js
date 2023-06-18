import React from "react";
import '../../styles/myclusters.css'
import exit from "../../resources/exit.svg";
import { ethers } from "ethers"  

import nftAbi from '../../abi/scepter.json';

function Cluster(props)
{
    const nftContractAddress = '0xAA3668F42ED1c7Ba0bDadee69Aaf68Ba5317Ea8c';

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(nftContractAddress, nftAbi, signer);
    const exitFunction = (e)=>{
        e.preventDefault();
        try{
            let clusterNumber = props.clusterId
            contract.removeUserFromCluster(clusterNumber);
           }
        catch(e)
        {
            console.log(e);
        }
    }
    const exitCluster = ()=>{
        
    }
    return (<div className="cluster">
        <div className="clusterId">{props.clusterId}</div>
        <button className="binButton" onClick={exitFunction}>
            <img className="bin" src={exit}></img>
        </button>
        </div>
    )
}


export default Cluster;