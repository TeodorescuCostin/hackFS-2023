pragma solidity ^0.8.0;
// SPDX-License-Identifier: MIT

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Base64.sol";

contract Profile is ERC721URIStorage, Ownable {

    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor() ERC721("Profile", "PRF") {}


    struct User{
    	string profilePicture;
        string nickName;
        string[] clusterIds;
    }

    mapping(address => User[]) public userIndexes;

    function createAccount(address recipient, string memory nickName, string memory profilePicture) public returns (uint256) {
        addUser(profilePicture, nickName);

        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        _mint(recipient, newItemId);
        string memory tokenURI = createTokenURI(nickName, profilePicture);
        _setTokenURI(newItemId, tokenURI);

        return newItemId;
    }

    function createTokenURI(string memory nickName, string memory profilePicture) public pure returns (string memory) {
        // Create the JSON object
        string memory json = string(abi.encodePacked(
            '{',
            '"name": "', nickName, '",',
            '"description": "Your account.",',
            '"image": "', profilePicture, '"',
            '}'
        ));

        string memory base64Json = Base64.encode(bytes(json));
        string memory dataURI = string(abi.encodePacked("data:application/json;base64,", base64Json));

        return dataURI;
    }

    function addUser(string memory profilePicture, string memory nickName) public returns(User memory) {
        userIndexes[msg.sender].push(User(profilePicture, nickName, new string[](0)));
        return User(profilePicture, nickName, new string[](0)); 
    }

    function addClusterId(string memory nickname, string memory clusterId) public returns (string[] memory) {
        User[] storage users = userIndexes[msg.sender];
        for (uint256 i = 0; i < users.length; i++) {
            if (keccak256(bytes(users[i].nickName)) == keccak256(bytes(nickname))) {
                users[i].clusterIds.push(clusterId);
                return users[i].clusterIds;
            }
        }
    }

    function changeProfilePicture(string memory nickname, string memory profilePicture) public returns (string memory) {
        User[] storage users = userIndexes[msg.sender];
        for (uint256 i = 0; i < users.length; i++) {
            if (keccak256(bytes(users[i].nickName)) == keccak256(bytes(nickname))) {
                users[i].profilePicture = profilePicture;
                return users[i].profilePicture;
            }
        }
    }

    function getUsersForWallet() public returns(User[] memory) {
        return userIndexes[msg.sender]; 
    }

    function getNumbersOfUsersWallet() public returns(uint256) {
        return userIndexes[msg.sender].length; 
    }

    function deleteUser(string memory nickname) public returns (bool) {
        User[] storage users = userIndexes[msg.sender];
        for (uint256 i = 0; i < users.length; i++) {
            if (keccak256(bytes(users[i].nickName)) == keccak256(bytes(nickname))) {
                users[i] = User("", "", new string[](0));
                return true;
            }
        }
        return false;
    }


}
