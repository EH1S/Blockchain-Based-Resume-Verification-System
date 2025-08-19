//SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract ResumeVerifier {
    struct Resume {
        string name;
        string ipfsCid;
        uint uploadedAt;
        bool isVerified;
    }

    mapping(address => Resume[]) private userResumes;
    address public admin;

    event ResumeUploaded(address indexed owner, string ipfsCid, uint timestamp);
    event ResumeVerified(address indexed owner, uint resumeIndex, address indexed verifier, uint timestamp);
    event AdminTransferred(address indexed previousAdmin, address indexed newAdmin);

    modifier onlyAdmin() {
        require(msg.sender == admin, "ONLY ADMIN CAN CALL THIS");
        _;
    }

    constructor() {
        admin = msg.sender;
    }

    function uploadResume(string calldata _name, string calldata _ipfsCid) external {
        userResumes[msg.sender].push(Resume({
            name: _name,
            ipfsCid: _ipfsCid,
            uploadedAt: block.timestamp,
            isVerified: false
        }));
        emit ResumeUploaded(msg.sender, _ipfsCid, block.timestamp);
    }
}