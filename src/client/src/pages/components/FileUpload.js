import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ethers } from 'ethers';
import '../../styles/fileupload.css';
import Web3 from 'web3';
import abi from '../../abi/scepter.json';
import PropagateLoader from "react-spinners/PropagateLoader";

function FileUpload(props) {
  const walletAddress = props.walletAddress;
  const [file, setFile] = useState(null);

  const [uploadState, setUploadState] = useState(true);
  const [selectedCluster, setSelectedCluster] = useState(0);

  const fileObject = {
    clusterId: 0,
    fileName: "",
    ipfsHash: ""
  }
  const options = [];



  const handleClusterChange = (e) => {
    setSelectedCluster(e.target.value);
    console.log("the clusterIDDDDDDDDDDDDDDDDDDDDDD:" + e.target.value);
  };

  async function uploadFile(cid) {
    if (!walletAddress) {
      alert('Please connect your wallet.');
      return;
    }

    const nftContractAddress = '0xAA3668F42ED1c7Ba0bDadee69Aaf68Ba5317Ea8c';
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(nftContractAddress, abi, signer);

    try {
        fileObject.clusterId = selectedCluster;
        fileObject.ipfsHash = cid;
        console.log(fileObject)
        const transaction = contract.addFile(fileObject.clusterId,  fileObject.fileName, fileObject.ipfsHash, 0);
        setUploadState(false);
        await transaction;
        setUploadState(true);

    } catch (error) {
      console.error(error);
    }
  }

  function renderOptions()
  {
    const clusterArray = props.clusters;
    if(clusterArray == undefined)
      return;
    let n = clusterArray.length;
    const options = [];
    for(let i = 0 ;i < n; ++i)
        {
          const xx = parseInt(clusterArray[i]['_hex'], 16);
          options.push(<option key ={i} value={xx}>{xx}</option>)
        }
    return(
        <select className = "orderByBibiloaca" name="choose cluster" defaultValue="chooseCluster" onChange={handleClusterChange}>
                        <option value="chooseCluster" disabled >Choose cluster...</option>
                        {options}
        </select>
    );
  }

  /*async function renderOptions() {
    if (!walletAddress) {
      alert('Please connect your wallet.');
      return;
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(nftContractAddress, abi, signer);

    try {
      const transaction = await contract.getUserCluster();
      await transaction.wait();

      for (let i = 0; i < transaction.length; ++i) {
        options.push(
          <option key={transaction[i]} value={transaction[i]}>
            {transaction[i]}
          </option>
        );
      }
    } catch (error) {
      console.error(error);
    }

    return (
      <select className="orderByBibiloaca" name="choose cluster" defaultValue="chooseCluster"  onChange={handleClusterChange}>
        <option value="chooseCluster" disabled>
          Choose cluster...
        </option>
        {options}
      </select>
    );
  }*/

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUploadClick = (e) => {
    e.preventDefault();
    if (!file) {
      return;
    }
    setFile(null);
    
    fileObject.fileName = file.name;  
    
    const formData = new FormData();
    formData.append('file', file);
    fetch('http://localhost:4000/api/send', {
      method: 'POST',
      body: formData,
    })
    .then((response) => { 

      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Error occurred during the request.');
      }

    })
    .then((data) => {
      uploadFile(data.path);
    })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />

      <form className="uploadSection" style={{ marginTop: '50px' }}>
      {
        uploadState 
        ?
        <>
        {file === null ? (
          <div className="file file--upload">
            <label htmlFor="input-file">
              <i className="material-icons">cloud_upload</i><span>Upload</span>
            </label>
            <input id="input-file" type="file" onChange={handleFileChange} />
          </div>
        ) : (
          <div className="file file--success">
            <label htmlFor="input-file">
              <i className="material-icons">cloud_done</i>Success
            </label>
            <input id="input-file" type="file" onChange={handleFileChange} />
          </div>
        )}
          {renderOptions()}
          <div className="wrapper">
            <button id="button" onClick={handleUploadClick}>
              <span>Submit</span>
              <div className="success"></div>
            </button>
          </div>
        </>
          :
          <PropagateLoader color="#0066FF" />
      }
      </form>
    </>
  );
}



export default FileUpload;