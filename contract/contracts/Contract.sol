// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
 
contract EVotingSystem {
    struct Candidate {
        uint id;
        string name;
        string photoUrl;
        uint voteCount;
    }

    struct Election {
        uint id;
        string name;
        string description;
        uint startTime;
        uint endTime;
        bool ended;
        mapping(uint => Candidate) candidates;
        uint candidateCount;
        mapping(address => bool) hasVoted;
    }
 
    struct Voter {
        bool isRegistered;
        bool hasVoted;
        uint votedCandidateId;
    }
 
    address public admin;
    uint public electionCount;
    mapping(uint => Election) public elections;
    mapping(address => Voter) public voters;
 
    event ElectionCreated(uint indexed electionId, string name, string description, uint startTime, uint endTime );
    event CandidateAdded(uint indexed electionId, uint candidateId, string name, string photoUrl);
    event VoteCasted(uint indexed electionId, uint indexed candidateId);
    event VoterRegistered(address voter);
 
    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action");
        _;
    }
 
    modifier electionExists(uint _electionId) {
        require(_electionId > 0 && _electionId <= electionCount, "Election does not exist");
        _;
    }
 
    modifier electionActive(uint _electionId) {
        Election storage election = elections[_electionId];
        require(block.timestamp >= election.startTime, "Election has not started yet");
        require(block.timestamp <= election.endTime, "Election has already ended");
        require(!election.ended, "Election has been ended");
        _;
    }
 
    modifier onlyRegisteredVoters() {
        require(voters[msg.sender].isRegistered, "You must be registered to vote");
        _;
    }
 
    constructor() {
        admin = msg.sender;
    }
 
    function registerVoter() public {
        require(!voters[msg.sender].isRegistered, "You are already registered");
 
        voters[msg.sender] = Voter(true, false, 0);
        emit VoterRegistered(msg.sender);
    }
 
    function createElection(string memory _name, string memory _description, uint _startTime, uint _endTime) public onlyAdmin {
        require(_startTime < _endTime, "Start time must be before end time");
 
        electionCount++;
        Election storage newElection = elections[electionCount];
        newElection.id = electionCount;
        newElection.name = _name;
        newElection.description = _description;
        newElection.startTime = _startTime;
        newElection.endTime = _endTime;
 
        emit ElectionCreated(electionCount, _name, _description, _startTime, _endTime);
    }
 
    function addCandidate(uint _electionId, string memory _name, string memory _photoUrl) public onlyAdmin electionExists(_electionId) {
        Election storage election = elections[_electionId];
        election.candidateCount++;
        election.candidates[election.candidateCount] = Candidate(election.candidateCount, _name, _photoUrl, 0);
 
        emit CandidateAdded(_electionId, election.candidateCount, _name, _photoUrl);
    }
 
    function vote(uint _electionId, uint _candidateId) public electionExists(_electionId) electionActive(_electionId) onlyRegisteredVoters {
        Election storage election = elections[_electionId];
        require(!election.hasVoted[msg.sender], "You have already voted in this election");
 
        Candidate storage candidate = election.candidates[_candidateId];
        require(candidate.id != 0, "Candidate does not exist");
 
        candidate.voteCount++;
        election.hasVoted[msg.sender] = true;
 
        Voter storage voter = voters[msg.sender];
        voter.hasVoted = true;
        voter.votedCandidateId = _candidateId;
 
        emit VoteCasted(_electionId, _candidateId);
    }
 
    function endElection(uint _electionId) public onlyAdmin electionExists(_electionId) {
        Election storage election = elections[_electionId];
        require(block.timestamp > election.endTime, "Election is still ongoing");
        require(!election.ended, "Election has already been ended");
 
        election.ended = true;
    }
 
    function getCandidate(uint _electionId, uint _candidateId) public view electionExists(_electionId) returns (uint, string memory, string memory, uint) {
        Election storage election = elections[_electionId];
        Candidate storage candidate = election.candidates[_candidateId];
        return (candidate.id, candidate.name, candidate.photoUrl, candidate.voteCount);
    }
 
    function getElectionResults(uint _electionId) public view electionExists(_electionId) returns (uint[] memory, string[] memory, string[] memory, uint[] memory) {
        Election storage election = elections[_electionId];
        uint[] memory ids = new uint[](election.candidateCount);
        string[] memory names = new string[](election.candidateCount);
        string[] memory photoUrls = new string[](election.candidateCount);
        uint[] memory voteCounts = new uint[](election.candidateCount);
 
        for (uint i = 1; i <= election.candidateCount; i++) {
            Candidate storage candidate = election.candidates[i];
            ids[i - 1] = candidate.id;
            names[i - 1] = candidate.name;
            photoUrls[i - 1] = candidate.photoUrl;
            voteCounts[i - 1] = candidate.voteCount;
        }
 
        return (ids, names, photoUrls, voteCounts);
    }
}
