import React, { useState, useEffect } from "react";
import '../../styles/myclusters.css'
import Cluster from "./Cluster";
import FileUpload from "./FileUpload";
import nftAbi from '../../abi/scepter.json'
import { ethers } from "ethers"
function MyClusters(props)
{
    const nftContractAddress = '0xAA3668F42ED1c7Ba0bDadee69Aaf68Ba5317Ea8c';

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(nftContractAddress, nftAbi, signer);
    const join = (e)=>{
        e.preventDefault();
        try{
            const clusterName = e.target.elements.clusterName.value;
            let clusterNumber = null;
            clusterNumber = parseInt(clusterName);
            if(isNaN(clusterNumber))
                {
                    e.preventDefault();
                    alert("invalid name!")
                }
            else contract.addUserToCluster(clusterNumber);
           }
        catch(e)
        {
            console.log(e);
        }
    }
    
    function renderClusters()
{
    
    console.log("now in MyClusters are  " + props.clusters);
    let n = props.clusters.length;
    const clusters = []
    for(let i = 0; i < n; ++i)
    {
        console.log("reached cluster " + props.clusters[i]);
        let xx = parseInt(props.clusters[i]['_hex'], 16);
        clusters.push(<Cluster key ={i} clusterId = {xx}></Cluster>)
    }

    return <div className="clusters">{clusters}</div>;
        }

    return (<div className="clustersDiv" onSubmit={join}>
        <h3> My Clusters</h3>
        <form>
            <input className="searchBarCluster" type="text" id="fname" name="clusterName" placeholder="Type cluster..."/>
            <input className="joinButton" type="submit" value="Join"></input>
        </form>
        {renderClusters()}
        
        
    </div>)
}






export default MyClusters;