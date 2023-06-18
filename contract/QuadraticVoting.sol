pragma solidity >=0.8.0;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";  

/**
 * @title QVVoting
 * @dev the manager for proposals / votes
 */
contract QVVoting is Ownable, AccessControl {
    using SafeMath for uint256;

    uint256 private _totalSupply;
    string public symbol;
    string public name;
    mapping(address => uint256) private _balances;

    event VoteCasted(address voter, uint256 ProposalID, uint256 weight);

    event ProposalCreated(
        address creator,
        uint256 ProposalID,
        string description,
        uint256 votingTimeInHours
    );

    enum ProposalStatus {IN_PROGRESS, TALLY, ENDED}

    struct Proposal {
        address creator;
        ProposalStatus status;
        uint256 yesVotes;
        uint256 noVotes;
        string description;
        address[] voters;
        uint256 expirationTime;
        mapping(address => Voter) voterInfo;
    }

    struct Voter {
        bool hasVoted;
        bool vote;
        uint256 weight;
    }

    mapping(uint256 => Proposal) public Proposals;
    uint public ProposalCount;

    constructor() {
        symbol = "QVV";
        name = "QV Voting";
    }

    /**
    * @dev Creates a new proposal.
    * @param _description the text of the proposal
    * @param _voteExpirationTime expiration time in minutes
    */
    function createProposal(
        string calldata _description,
        uint256 _voteExpirationTime
    ) external onlyOwner returns (uint256) {
        require(_voteExpirationTime > 0, "The voting period cannot be 0");
        ProposalCount++;

        Proposal storage curProposal = Proposals[ProposalCount];
        curProposal.creator = _msgSender();
        curProposal.status = ProposalStatus.IN_PROGRESS;
        curProposal.expirationTime = block.timestamp + (_voteExpirationTime * 1 minutes);
        curProposal.description = _description;

        emit ProposalCreated(
            _msgSender(),
            ProposalCount,
            _description,
            _voteExpirationTime
        );
        return ProposalCount;
    }

    /**
    * @dev sets a proposal to TALLY.
    * @param _ProposalID the proposal id
    */
    function setProposalToTally(uint256 _ProposalID)
        external
        validProposal(_ProposalID)
        onlyOwner
    {
        require(
            Proposals[_ProposalID].status == ProposalStatus.IN_PROGRESS,
            "Vote is not in progress"
        );
        require(
            block.timestamp >= getProposalExpirationTime(_ProposalID),
            "voting period has not expired"
        );
        Proposals[_ProposalID].status = ProposalStatus.TALLY;
    }

    /**
    * @dev sets a proposal to ENDED.
    * @param _ProposalID the proposal id
    */
    function setProposalToEnded(uint256 _ProposalID)
        external
        validProposal(_ProposalID)
        onlyOwner
    {
        require(
            Proposals[_ProposalID].status == ProposalStatus.TALLY,
            "Proposal should be in tally"
        );
        require(
            block.timestamp >= getProposalExpirationTime(_ProposalID),
            "voting period has not expired"
        );
        Proposals[_ProposalID].status = ProposalStatus.ENDED;
    }

    /**
    * @dev returns the status of a proposal
    * @param _ProposalID the proposal id
    */
    function getProposalStatus(uint256 _ProposalID)
        public
        view
        validProposal(_ProposalID)
        returns (ProposalStatus)
    {
        return Proposals[_ProposalID].status;
    }

    /**
    * @dev returns a proposal expiration time
    * @param _ProposalID the proposal id
    */
    function getProposalExpirationTime(uint256 _ProposalID)
        public
        view
        validProposal(_ProposalID)
        returns (uint256)
    {
        return Proposals[_ProposalID].expirationTime;
    }

    /**
    * @dev counts the votes for a proposal. Returns (yeays, nays)
    * @param _ProposalID the proposal id
    */
    function countVotes(uint256 _ProposalID) public view returns (uint256, uint256) {
        uint256 yesVotes = 0;
        uint256 noVotes = 0;

        address[] memory voters = Proposals[_ProposalID].voters;
        for (uint256 i = 0; i < voters.length; i++) {
            address voter = voters[i];
            bool vote = Proposals[_ProposalID].voterInfo[voter].vote;
            uint256 weight = Proposals[_ProposalID].voterInfo[voter].weight;
            if (vote == true) {
                yesVotes += weight;
            } else {
                noVotes += weight;
            }
        }

        return (yesVotes, noVotes);
    }

    /**
    * @dev casts a vote.
    * @param _ProposalID the proposal id
    * @param numTokens number of voice credits
    * @param _vote true for yes, false for no
    */
    function castVote(uint256 _ProposalID, uint256 numTokens, bool _vote)
        external
        validProposal(_ProposalID)
    {
        require(
            getProposalStatus(_ProposalID) == ProposalStatus.IN_PROGRESS,
            "proposal has expired."
        );
        require(
            !userHasVoted(_ProposalID, _msgSender()),
            "user already voted on this proposal"
        );
        require(
            getProposalExpirationTime(_ProposalID) > block.timestamp,
            "for this proposal, the voting time expired"
        );

        _balances[_msgSender()] = _balances[_msgSender()].sub(numTokens);

        uint256 weight = sqrt(numTokens); // QV Vote

        Proposal storage curproposal = Proposals[_ProposalID];

        curproposal.voterInfo[_msgSender()] = Voter({
            hasVoted: true,
            vote: _vote,
            weight: weight
        });

        curproposal.voters.push(_msgSender());

        emit VoteCasted(_msgSender(), _ProposalID, weight);
    }

    /**
    * @dev checks if a user has voted
    * @param _ProposalID the proposal id
    * @param _user the address of a voter
    */
    function userHasVoted(uint256 _ProposalID, address _user)
        internal
        view
        validProposal(_ProposalID)
        returns (bool)
    {
        return (Proposals[_ProposalID].voterInfo[_user].hasVoted);
    }

    /**
    * @dev checks if a proposal id is valid
    * @param _ProposalID the proposal id
    */
    modifier validProposal(uint256 _ProposalID) {
        require(
            _ProposalID > 0 && _ProposalID <= ProposalCount,
            "Not a valid Proposal Id"
        );
        _;
    }

    /**
    * @dev returns the square root (in int) of a number
    * @param x the number (int)
    */
    function sqrt(uint256 x) internal pure returns (uint256 y) {
        uint256 z = (x + 1) / 2;
        y = x;
        while (z < y) {
            y = z;
            z = (x / z + z) / 2;
        }
    }

    /**
    * @dev minting more tokens for an account
    */
    function mint(address account, uint256 amount) public onlyOwner {
        require(account != address(0), " mint to the zero address");
        _totalSupply = _totalSupply.add(amount);
        _balances[account] = _balances[account].add(amount);
    }

    /**
    * @dev returns the balance of an account
    */
    function balanceOf(address account) public view returns (uint256) {
        return _balances[account];
    }
}
