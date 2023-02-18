// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Consent {

    struct Owner {
        string name;
        uint age;
        string email;
        uint mobileNumber;
        uint aadharNumber;
        string panNumber;
        bool consent;
    }

    mapping(address => Owner) public owners;

    event ConsentGiven(address indexed ownerAddress, string name, uint age,string email,uint mobileNumber,uint aadharNumber,string panNumber);
    event ConsentRevoked(address indexed ownerAddress, string name, uint age,string email,uint mobileNumber,uint aadharNumber,string panNumber);

    function giveConsent(string memory _name, uint _age,string memory _email,uint _mobileNumber,uint _aadharNumber,string memory _panNumber) public {
        owners[msg.sender] = Owner(_name, _age,_email,_mobileNumber,_aadharNumber,_panNumber, true);
        emit ConsentGiven(msg.sender, _name, _age,_email,_mobileNumber,_aadharNumber,_panNumber);
    }

    function revokeConsent() public {
        require(owners[msg.sender].consent, "Owner has not given consent");
        owners[msg.sender].consent = false;
        emit ConsentRevoked(msg.sender, owners[msg.sender].name, owners[msg.sender].age,owners[msg.sender].email,owners[msg.sender].mobileNumber,owners[msg.sender].aadharNumber,owners[msg.sender].panNumber);
    }

    function verifyConsent(address _ownerAddress) public view returns (string memory,uint,string memory,uint, uint,string memory,bool) {
        return (owners[_ownerAddress].name, owners[_ownerAddress].age,owners[_ownerAddress].email,owners[_ownerAddress].mobileNumber,owners[_ownerAddress].aadharNumber,owners[_ownerAddress].panNumber, owners[_ownerAddress].consent);
    }
}