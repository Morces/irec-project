// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NFTCertificate is ERC721, ERC721URIStorage, Ownable {
    uint256 private _tokenCounter;

    // Constructor initializes the ERC721 and Ownable contracts
    constructor() ERC721("NFTCertificate", "NFTC") {
        _tokenCounter = 0;
    }

    // Minting function for creating certificates
    function mintCertificate(address recipient, string memory newTokenURI) public onlyOwner returns (uint256) {
        uint256 newItemId = _tokenCounter;
        _safeMint(recipient, newItemId);
        _setTokenURI(newItemId, newTokenURI);
        _tokenCounter++;
        return newItemId;
    }

    // Overriding _burn to handle token burning
    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    // Overriding tokenURI to correctly retrieve token metadata
    function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    // Supports interface check for ERC721 and ERC721URIStorage
    function supportsInterface(bytes4 interfaceId) public view override(ERC721, ERC721URIStorage) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
