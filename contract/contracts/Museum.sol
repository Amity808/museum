// SPX-License-Identifier: MIT

pragma solidity ^0.8.28;
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {AccessControl} from "@openzeppelin/contracts/access/AccessControl.sol";


// ai verification


contract Museum is ERC721URIStorage, ReentrancyGuard, AccessControl {

    uint256 public totalMuseums;
    uint256 public tokenCounter;
    address public admin;

    struct Artifact {
        string name;
        string imageURI;
        string location;
        uint256 ticketPrice;
        uint256 totalRevenue;
        uint256 totalVisitors;
    }

    enum ArtifactStatus { Active, Flagged, Archived, Deprecated }

    mapping(uint256 => Artifact) public artifact;

    constructor() ERC721("Museum", "MHR") {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        tokenCounter = 0;
        totalMuseums = 0;
    }

     function mintDocToNFT(string memory imageURI) public {
        _safeMint(msg.sender, tokenCounter);
        _setTokenURI(tokenCounter, imageURI);
        tokenCounter++;
    }

    function createArtifact(string memory _name, string memory _location, uint256 _ticketPrice, string memory _imageURI) public {
        artifact[totalMuseums] = Artifact(_name, _imageURI, _location, _ticketPrice, 0, 0);
        _safeMint(msg.sender, tokenCounter);
        _setTokenURI(tokenCounter, imageURI);
        tokenCounter++;
        totalMuseums++;
    }

    // Override the supportsInterface function
    function supportsInterface(bytes4 interfaceId) public view override(ERC721URIStorage, AccessControl) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

}