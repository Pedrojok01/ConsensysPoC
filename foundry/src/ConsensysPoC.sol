// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {ERC721Enumerable} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract ConsensysPoC is ERC721, ERC721Enumerable {
    string private constant TOKEN_URI =
        "ipfs://QmbdHSfasCqAmwcGGKDqp23aMSY5DvGiRZy4cq1tbGEm5t/metadata.json";
    uint256 private _nextTokenId;

    constructor() ERC721("ConsensysPoC", "CPC") {}

    function safeMint(address to) public {
        uint256 tokenId = ++_nextTokenId;
        _safeMint(to, tokenId);
    }

    function tokenURI(
        uint256 tokenId
    ) public view override returns (string memory) {
        _requireOwned(tokenId);

        return TOKEN_URI;
    }

    function _update(
        address to,
        uint256 tokenId,
        address auth
    ) internal override(ERC721, ERC721Enumerable) returns (address) {
        return super._update(to, tokenId, auth);
    }

    function _increaseBalance(
        address account,
        uint128 value
    ) internal override(ERC721, ERC721Enumerable) {
        super._increaseBalance(account, value);
    }

    function supportsInterface(
        bytes4 interfaceId
    ) public view override(ERC721, ERC721Enumerable) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
