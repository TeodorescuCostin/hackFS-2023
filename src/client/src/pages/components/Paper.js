import React from "react";
import '../../styles/paper.css'
import { create } from "ipfs-http-client"
import download from '../../resources/download.svg'
import file from '../../resources/file.svg'

import { ethers } from "ethers"  

import abi from '../../abi/scepter.json';

function Paper(props) {

    const path = "https://ipfs.infura.io/ipfs/" + props.path;

    async function upVote(){
    
        const nftContractAddress = '0xAA3668F42ED1c7Ba0bDadee69Aaf68Ba5317Ea8c';
    
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(nftContractAddress, abi, signer);
    
        try {
          const upVote = await contract.addVote(props.clusterId, props.index, 1);
        } catch (error) {
          console.error(error);
        }
      }

      async function downVote(){
    
        const nftContractAddress = '0xAA3668F42ED1c7Ba0bDadee69Aaf68Ba5317Ea8c';
    
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(nftContractAddress, abi, signer);
    
        try {
          const upVote = await contract.removeVote(props.clusterId, props.index, 1);
        } catch (error) {
          console.error(error);
        }
      }

      
    async function getFile() {
      try{

      const projectId = "2NDGbCqiFAcMrdd7jTwRYijpwHS";
      const projectSecret = "2692cc854370657ea0fa6e9226d71383";
      const authorization = "Basic " + btoa(projectId + ":" + projectSecret);
      const ipfs = create({
          url: "https://ipfs.infura.io:5001/api/v0",
          headers:{
            authorization
          }
      })
      // Handle retrieved files
      const stream = ipfs.cat(props.path);
      const chunks = [];

      for await (const chunk of stream) {
          chunks.push(chunk);
      }

      const blob = new Blob(chunks);
      const url = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.setAttribute(
          'download',
          props.fileName
      );

      // Append to HTML link element page
      document.body.appendChild(link);

      // Start download
      link.click();

      // Clean up and remove the link
      link.parentNode.removeChild(link);
      }
      catch(e)
      {
          console.log(e);
      }
    }
    

    return (
        <div className="paper">
            <div className = "paperHeader">
                <div className = "number"><p>{props.number}</p></div>
                
                <div className="points">
                    <div className="votesSection">
                        <button className="voteButtonL" onClick={upVote}>Up Vote</button>
                        <p style={{fontWeight: 'bold'}}>{props.points}</p>
                        <button style={{marginBottom: '10px'}} className="voteButtonD" onClick={downVote}>Down Vote</button>
                    </div>
                </div>
            </div>
            <div className="paperContent">
                <img className="fileIcon" src={file}></img>
                <div className="dataAboutFile">
                    {/* TODO: Update this info with info from files */}
                    <h3 style={{marginBottom: '-19px'}}>{props.fileName}</h3>
                    <h6>by {props.author}</h6>
                </div>
                <button className="downloadButton" onClick={getFile}><img className="download" src={download}></img></button>
            </div>
        </div>
    )
}



export default Paper;