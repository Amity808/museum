// SPX-License-Identifier: MIT

pragma solidity ^0.8.28;
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {AccessControl} from "@openzeppelin/contracts/access/AccessControl.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

// ai verification

contract Museum is ERC721URIStorage, ReentrancyGuard, AccessControl {
    using SafeERC20 for IERC20;

    bytes32 public constant MANAGER_ROLE = keccak256("MANAGER_ROLE");
    bytes32 public constant USER_ROLE = keccak256("USER");

    error INVALID_INDEX();
    error settlePayment();
    error Already_Initilized();

    address public token;
    uint256 public totalMuseums;
    uint256 public tokenCounter;
    address public admin;
    uint256 public fee;
    

    enum ArtifactStatus {
        Active,
        Flagged,
        Archived,
        Deprecated
    }

    struct Artifact {
        string name;
        string imageURI;
        string location;
        uint256 ticketPrice;
        uint256 totalRevenue;
        uint256 totalVisitors;
        ArtifactStatus status;
        address owner;
    }

    mapping(uint256 => Artifact) public artifact;
    mapping(address => bool) public haveAccess;
    // mapping(address => uint256) public getAccess;
    mapping(address => mapping(uint256 => bool)) public getAccess;

    modifier onlyUser() {
        require(
            hasRole(USER_ROLE, msg.sender),
            "Only comminity user can call this function"
        );
        _;
    }

    modifier onlyAdminD() {
        require(msg.sender == admin, "Only admin can call this function");
        _;
    }
  
    modifier onlyManger() {
        require(
            hasRole(MANAGER_ROLE, msg.sender),
            "Only Manager can call this function"
        );
        _;
    }

    modifier isAccessible(address user) {
        if (haveAccess[user] == false) revert settlePayment();
        _;
    }

    modifier Must_Be_GreaterZero(uint256 index) {
        if (index > totalMuseums) revert INVALID_INDEX();
        _;
    }

    constructor( uint256 _fee,
        address _token,
        address _admin) ERC721("Museum", "MHR"){
        _setRoleAdmin(USER_ROLE, DEFAULT_ADMIN_ROLE);
        _setRoleAdmin(MANAGER_ROLE, DEFAULT_ADMIN_ROLE);
        _grantRole(DEFAULT_ADMIN_ROLE, _admin);
        tokenCounter = 0;
        totalMuseums = 0;
        token = _token;
        admin = _admin;
        fee = _fee;
        
    }

 

    function mintDocToNFT(string memory imageURI) public {
        _safeMint(msg.sender, tokenCounter);
        _setTokenURI(tokenCounter, imageURI);
        tokenCounter++;
    }

    function createArtifact(
        string memory _name,
        string memory _location,
        uint256 _ticketPrice,
        string memory _imageURI
    ) public onlyManger {
        artifact[totalMuseums] = Artifact(
            _name,
            _imageURI,
            _location,
            _ticketPrice,
            0,
            0,
            ArtifactStatus.Active,
            msg.sender
        );
        _safeMint(msg.sender, tokenCounter);
        _setTokenURI(tokenCounter, _imageURI);
        tokenCounter++;
        totalMuseums++;
    }

    function flagNFt(uint256 index) public Must_Be_GreaterZero(index) {
        artifact[index].status = ArtifactStatus.Flagged;
    }

    function accessArtifact(uint256 _index) public Must_Be_GreaterZero(_index) nonReentrant {
        IERC20(token).safeTransferFrom(msg.sender, admin, fee);
        getAccess[msg.sender][_index] = true;
        haveAccess[msg.sender] = true;
    }

    function getArtifact(
        uint256 _index
    )
        public
        view
        returns (
            string memory,
            string memory,
            string memory,
            uint256,
            uint256,
            uint256,
            ArtifactStatus,
            address
        )
    {
        Artifact storage art = artifact[_index];

        return (
            art.name,
            art.imageURI,
            art.location,
            art.ticketPrice,
            art.totalRevenue,
            art.totalVisitors,
            art.status,
            art.owner
        );
    }
    function setFee(uint256 _fee) public onlyManger {
    fee = _fee;
}

    // Override the supportsInterface function
    function supportsInterface(
        bytes4 interfaceId
    ) public view override(ERC721URIStorage, AccessControl) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
