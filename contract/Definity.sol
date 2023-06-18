// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract Definity {
    struct File {
        address creator;
        string ipfsHash;
        string fileName;
        uint256 timestamp;
        uint256 numberOfVotes;
    }

    struct User {
        uint256 numberOfVotes;
        string nickName;
    }
    
    mapping(uint256 => File[]) private files;
    mapping(address => uint256[]) private userFiles;
    mapping(address => User) private userDetails;

    event FileAdded(uint256 clusterId, address creator, string ipfsHash, uint256 timestamp);
    
    function addFile(uint256 clusterId, string memory fileName, string memory ipfsHash, uint256 numberOfVotes) public {
        require(isUserInCluster(msg.sender, clusterId), "User is not in the cluster");
        
        File[] storage clusterFiles = files[clusterId];
        
        clusterFiles.push(File({
            creator: msg.sender,
            ipfsHash: ipfsHash,
            fileName: fileName, 
            numberOfVotes: numberOfVotes,
            timestamp: block.timestamp
        }));
        
        emit FileAdded(clusterId, msg.sender, ipfsHash, block.timestamp);
    }
    
    function getFiles(uint256 clusterId) public view returns (File[] memory) {
        return files[clusterId];
    }
    
    function getUserCluster(address wallet) public view returns (uint256[] memory) {
        return userFiles[wallet];
    }

    function isUserInCluster(address userAddress, uint256 clusterId) private view returns (bool) {
        uint256[] storage userClusters = userFiles[userAddress];
        for (uint256 i = 0; i < userClusters.length; i++) {
            if (userClusters[i] == clusterId) {
                return true;
            }
        }
        return false;
    }

    function addUserToCluster(uint256 clusterId) public {
        userFiles[msg.sender].push(clusterId);
    }

    function removeUserFromCluster(uint256 clusterId) public {
        uint256[] storage userCluster = userFiles[msg.sender];
        uint256 index = userCluster.length;
        for (uint256 i = 0; i < userCluster.length; i++) {
            if (userCluster[i] == clusterId) {
                index = i;
            }
        }
        if(index != userCluster.length)
        {
            for(uint256 i = index; i +1 < userCluster.length;i++)
                userCluster[i]= userCluster[i+1];
            userCluster.pop();
            //delete userCluster[userCluster.length-1];
            //userCluster.length--;
        }
    }

    function getFilesPath(uint256 clusterId, uint256 index) public view returns (string memory) {
        File[] storage clusterFiles = files[clusterId];
        
        require(index < clusterFiles.length, "Index out of range");
        
        return clusterFiles[index].ipfsHash;
    }

    function addVote(uint256 clusterId, uint256 index, uint256 xParam) public returns (uint256) {
        File[] storage clusterFiles = files[clusterId];
        
        require(index < clusterFiles.length, "Index out of range");
        
        File storage file = clusterFiles[index];
        file.numberOfVotes += xParam;
        
        return file.numberOfVotes;
    }

    function removeVote(uint256 clusterId, uint256 index, uint256 xParam) public returns (uint256) {
        File[] storage clusterFiles = files[clusterId];
        
        require(index < clusterFiles.length, "Index out of range");
        
        File storage file = clusterFiles[index];
        
        if (file.numberOfVotes >= xParam) {
            file.numberOfVotes -= xParam;
        } else {
            file.numberOfVotes = 0;
        }
        
        return file.numberOfVotes;
    }
}
