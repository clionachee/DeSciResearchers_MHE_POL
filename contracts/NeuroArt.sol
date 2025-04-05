// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title NeuroArt
 * @dev ERC721 contract for NeuroArt Nexus NFTs.
 * Each NFT represents a unique piece of art generated from user's neural data
 * and behavioral choices, with metadata stored off-chain via tokenURI.
 */
contract NeuroArt is ERC721, ERC721Enumerable, Ownable {
    // 使用標準 uint256 變量替代 Counters
    uint256 private _nextTokenId;

    // Mapping from token ID to token URI
    mapping(uint256 => string) private _tokenURIs;

    /**
     * @dev Constructor initializes the NFT collection.
     * @param initialOwner The address that will initially own the contract.
     */
    constructor(address initialOwner)
        ERC721("NeuroArt Nexus", "NAN")
        Ownable(initialOwner)
    {}

    /**
     * @dev Mints a new NeuroArt NFT to the specified recipient.
     * Can only be called by the contract owner (backend service via MultiBaas).
     * The metadata (including art parameters and background choice) should be
     * compiled off-chain and referenced by the tokenURI.
     * @param to The address that will receive the minted NFT.
     * @param tokenURI_ The URI pointing to the off-chain metadata JSON file.
     */
    function safeMint(address to, string memory tokenURI_) public {
        uint256 tokenId = _nextTokenId;
        _nextTokenId++;
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, tokenURI_);
    }

    /**
     * @dev Sets the token URI for a given token ID. Internal function.
     * @param tokenId The ID of the token.
     * @param tokenURI_ The URI string.
     */
    function _setTokenURI(uint256 tokenId, string memory tokenURI_) internal virtual {
        // 檢查 token 是否存在，改用 _ownerOf 替代 _exists
        require(_ownerOf(tokenId) != address(0), "ERC721Metadata: URI set for nonexistent token");
        _tokenURIs[tokenId] = tokenURI_;
    }

    /**
     * @dev Returns the Uniform Resource Identifier (URI) for `tokenId` token.
     */
    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        // 檢查 token 是否存在，使用 ownerOf 而不是 _exists
        address owner = _ownerOf(tokenId);
        require(owner != address(0), "ERC721Metadata: URI query for nonexistent token");
        
        string memory _uri = _tokenURIs[tokenId];
        // If URI is not set, return an empty string or base URI if implemented
        return _uri;
    }

    // The following functions are overrides required by Solidity.

    function _update(address to, uint256 tokenId, address auth)
        internal
        override(ERC721, ERC721Enumerable)
        returns (address)
    {
        return super._update(to, tokenId, auth);
    }

    function _increaseBalance(address account, uint128 value)
        internal
        override(ERC721, ERC721Enumerable)
    {
        super._increaseBalance(account, value);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}