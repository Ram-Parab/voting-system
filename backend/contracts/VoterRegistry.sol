// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract VoterRegistry {
    struct VoterData {
        string fullName;
        string dateOfBirth;
        string gender;
        string residentialAddress;
        string phoneNumber;
        string governmentId;
        string photoHash;
        bool exists;
    }
    
    mapping(address => VoterData) public voters;
    
    event VoterRegistered(address indexed voterAddress);

    function registerVoter(
        string memory _fullName,
        string memory _dateOfBirth,
        string memory _gender,
        string memory _residentialAddress,
        string memory _phoneNumber,
        string memory _governmentId,
        string memory _photoHash
    ) public {
        VoterData memory newVoter = VoterData({
            fullName: _fullName,
            dateOfBirth: _dateOfBirth,
            gender: _gender,
            residentialAddress: _residentialAddress,
            phoneNumber: _phoneNumber,
            governmentId: _governmentId,
            photoHash: _photoHash,
            exists: true
        });
        
        voters[msg.sender] = newVoter;
        emit VoterRegistered(msg.sender);
    }

    function getVoter(address _voterAddress) public view returns (
        string memory fullName,
        string memory dateOfBirth,
        string memory gender,
        string memory residentialAddress,
        string memory phoneNumber,
        string memory governmentId,
        string memory photoHash
    ) {
        require(voters[_voterAddress].exists, "Voter not found");
        VoterData memory voter = voters[_voterAddress];
        return (
            voter.fullName,
            voter.dateOfBirth,
            voter.gender,
            voter.residentialAddress,
            voter.phoneNumber,
            voter.governmentId,
            voter.photoHash
        );
    }
} 