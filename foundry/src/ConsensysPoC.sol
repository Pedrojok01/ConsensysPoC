// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract ConsensysPoC is ERC721 {
    string private immutable TOKEN_URI =
        "ipfs://QmbdHSfasCqAmwcGGKDqp23aMSY5DvGiRZy4cq1tbGEm5t/metadata.json";
    uint256 private _nextTokenId;

    constructor() ERC721("ConsensysPoC", "CPC") {}

    function _baseURI() internal pure override returns (string memory) {
        return TOKEN_URI;
    }

    function safeMint(address to) public {
        uint256 tokenId = _nextTokenId++;
        _safeMint(to, tokenId);
    }
}
