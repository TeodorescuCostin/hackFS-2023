// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract AvatarGenerator {

    mapping(string => string) private _getColor;

    constructor() {
        // define the colors
        _getColor["0"] = "#FFF500";
        _getColor["1"] = "#FF8A00";
        _getColor["2"] = "#FF0000";
        _getColor["3"] = "#52FF00";
        _getColor["4"] = "#00FF66";
        _getColor["5"] = "#00B2FF";
        _getColor["6"] = "#00FFFF";
        _getColor["7"] = "#0029FF";
        _getColor["8"] = "#FF06F0";
        _getColor["9"] = "#FF003C";
        _getColor["A"] = "#FF9E00";
        _getColor["B"] = "#84862D";
        _getColor["C"] = "#FF00C7";
        _getColor["D"] = "#00FF0A";
        _getColor["E"] = "#3C00BB";
        _getColor["F"] = "#00FF57";
    }


    function generateAvatar(address _address) public view returns (string memory) {
        string memory newAddress = toAsciiString(_address);
        string memory svg = string(abi.encodePacked(
            '<svg width="70" height="70" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">',
            '<rect width="70" height="70" fill="#FFFFFF"/>',
            '<rect y="50" width="10" height="10" fill="', _getColor[string(abi.encodePacked(bytes(newAddress)[2]))], '"/>',
            '<rect y="60" width="10" height="10" fill="', _getColor[string(abi.encodePacked(bytes(newAddress)[3]))], '"/>',
            '<rect x="10" y="50" width="10" height="10" fill="', _getColor[string(abi.encodePacked(bytes(newAddress)[4]))], '"/>',
            '<rect x="10" y="60" width="10" height="10" fill="', _getColor[string(abi.encodePacked(bytes(newAddress)[5]))], '"/>',
            '<rect x="20" y="50" width="10" height="10" fill="', _getColor[string(abi.encodePacked(bytes(newAddress)[6]))], '"/>',
            '<rect x="20" y="60" width="10" height="10" fill="', _getColor[string(abi.encodePacked(bytes(newAddress)[7]))], '"/>',
            '<rect x="30" y="50" width="10" height="10" fill="', _getColor[string(abi.encodePacked(bytes(newAddress)[8]))], '"/>',
            '<rect x="30" y="60" width="10" height="10" fill="', _getColor[string(abi.encodePacked(bytes(newAddress)[9]))], '"/>',
            '<rect x="40" y="50" width="10" height="10" fill="', _getColor[string(abi.encodePacked(bytes(newAddress)[10]))], '"/>',
            '<rect x="40" y="60" width="10" height="10" fill="', _getColor[string(abi.encodePacked(bytes(newAddress)[11]))], '"/>',
            '<rect x="50" y="50" width="10" height="10" fill="', _getColor[string(abi.encodePacked(bytes(newAddress)[12]))], '"/>',
            '<rect x="50" y="60" width="10" height="10" fill="', _getColor[string(abi.encodePacked(bytes(newAddress)[13]))], '"/>',
            '<rect x="60" y="50" width="10" height="10" fill="', _getColor[string(abi.encodePacked(bytes(newAddress)[14]))], '"/>',
            '<rect x="60" y="60" width="10" height="10" fill="', _getColor[string(abi.encodePacked(bytes(newAddress)[15]))], '"/>',
            '<rect width="10" height="10" fill="', _getColor[string(abi.encodePacked(bytes(newAddress)[16]))], '"/>',
            '<rect y="10" width="10" height="10" fill="', _getColor[string(abi.encodePacked(bytes(newAddress)[17]))], '"/>',
            '<rect x="10" width="10" height="10" fill="', _getColor[string(abi.encodePacked(bytes(newAddress)[18]))], '"/>',
            '<rect x="10" y="10" width="10" height="10" fill="', _getColor[string(abi.encodePacked(bytes(newAddress)[19]))], '"/>',
            '<rect y="20" width="10" height="10" fill="', _getColor[string(abi.encodePacked(bytes(newAddress)[20]))], '"/>',
            '<rect y="30" width="10" height="10" fill="', _getColor[string(abi.encodePacked(bytes(newAddress)[21]))], '"/>',
            '<rect y="40" width="10" height="10" fill="', _getColor[string(abi.encodePacked(bytes(newAddress)[22]))], '"/>',
            '<rect x="10" y="20" width="10" height="10" fill="', _getColor[string(abi.encodePacked(bytes(newAddress)[23]))], '"/>',
            '<rect x="10" y="30" width="10" height="10" fill="', _getColor[string(abi.encodePacked(bytes(newAddress)[24]))], '"/>',
            '<rect x="10" y="40" width="10" height="10" fill="', _getColor[string(abi.encodePacked(bytes(newAddress)[25]))], '"/>',
            '<rect x="20" width="10" height="10" fill="', _getColor[string(abi.encodePacked(bytes(newAddress)[26]))], '"/>',
            '<rect x="20" y="10" width="10" height="10" fill="', _getColor[string(abi.encodePacked(bytes(newAddress)[27]))], '"/>',
            '<rect x="30" width="10" height="10" fill="', _getColor[string(abi.encodePacked(bytes(newAddress)[28]))], '"/>',
            '<rect x="30" y="10" width="10" height="10" fill="', _getColor[string(abi.encodePacked(bytes(newAddress)[29]))], '"/>',
            '<rect x="40" width="10" height="10" fill="', _getColor[string(abi.encodePacked(bytes(newAddress)[30]))], '"/>',
            '<rect x="40" y="10" width="10" height="10" fill="', _getColor[string(abi.encodePacked(bytes(newAddress)[31]))], '"/>',
            '<rect x="50" width="10" height="10" fill="', _getColor[string(abi.encodePacked(bytes(newAddress)[32]))], '"/>',
            '<rect x="50" y="10" width="10" height="10" fill="', _getColor[string(abi.encodePacked(bytes(newAddress)[33]))], '"/>',
            '<rect x="50" y="20" width="10" height="10" fill="', _getColor[string(abi.encodePacked(bytes(newAddress)[34]))], '"/>',
            '<rect x="50" y="30" width="10" height="10" fill="', _getColor[string(abi.encodePacked(bytes(newAddress)[35]))], '"/>',
            '<rect x="50" y="40" width="10" height="10" fill="', _getColor[string(abi.encodePacked(bytes(newAddress)[36]))], '"/>',
            '<rect x="60" width="10" height="10" fill="', _getColor[string(abi.encodePacked(bytes(newAddress)[37]))], '"/>',
            '<rect x="60" y="10" width="10" height="10" fill="', _getColor[string(abi.encodePacked(bytes(newAddress)[38]))], '"/>',
            '<rect x="60" y="20" width="10" height="10" fill="', _getColor[string(abi.encodePacked(bytes(newAddress)[39]))], '"/>',
            '<rect x="60" y="30" width="10" height="10" fill="', _getColor[string(abi.encodePacked(bytes(newAddress)[40]))], '"/>',
            '<rect x="60" y="40" width="10" height="10" fill="', _getColor[string(abi.encodePacked(bytes(newAddress)[41]))], '"/>',
            '</svg>'
        ));

        return svg;
    }

    function toAsciiString(address x) internal pure returns (string memory) {
        bytes memory s = new bytes(40);
        for (uint i = 0; i < 20; i++) {
            bytes1 b = bytes1(uint8(uint(uint160(x)) / (2**(8*(19 - i)))));
            bytes1 hi = bytes1(uint8(b) / 16);
            bytes1 lo = bytes1(uint8(b) - 16 * uint8(hi));
            s[2*i] = char(hi);
            s[2*i+1] = char(lo);            
        }
        return string(s);
    }

    function char(bytes1 b) internal pure returns (bytes1 c) {
        if (uint8(b) < 10) return bytes1(uint8(b) + 0x30);
        else return bytes1(uint8(b) + 0x57);
    }
}
