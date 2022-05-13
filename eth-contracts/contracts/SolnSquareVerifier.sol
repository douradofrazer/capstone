// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

// Define a contract call to the zokrates generated solidity contract <Verifier> or <renamedVerifier>
import "./ERC721Mintable.sol";
import "./Verifier.sol";

// interface Verifier {
//     struct Proof {
//         Pairing.G1Point a;
//         Pairing.G2Point b;
//         Pairing.G1Point c;
//     }
//     function verifyTx(Proof memory proof, uint[2] memory input) external view returns (bool r);
// }

// Define another contract named SolnSquareVerifier that inherits from your ERC721Mintable class
contract SolnSquareVerifier is ERC721Mintable {

    Verifier verifier;

    constructor(address _verifierContractAddress) ERC721Mintable ("RealEstateTokenZ", "REZ") public {
        verifier = Verifier(_verifierContractAddress);
    }

    // Define a solutions struct that can hold an index & an address
    struct Solution {
        address user;
        uint256 tokenId;
    }

    // Define an array of the above struct
    // Define a mapping to store unique solutions submitted
    mapping(bytes32 => Solution) private uniqueSolns;

    // Create an event to emit when a solution is added
    event SolutionAdded(bytes32 key, uint256 tokenId, address user);

    // Create a function to add the solutions to the array and emit the event
    function addSolution( address user, uint256 tokenId, uint[2] memory input) public {

        bytes32 key = generateKey(user, tokenId, input);

        uniqueSolns[key] = Solution({
            user: user,
            tokenId : tokenId
        });

        emit SolutionAdded(key, tokenId, user);
    }

    function generateKey(address user, uint256 tokenId, uint[2] memory input) pure internal returns (bytes32) {
        return keccak256(abi.encodePacked(user, tokenId, input));
    }

    // Create a function to mint new NFT only after the solution has been verified
    //  - make sure the solution is unique (has not been used before)
    //  - make sure you handle metadata as well as tokenSuplly
    function mintNFT(Verifier.Proof memory proof, uint[2] memory input, address user, uint256 tokenId) public returns (bool) {

        require(verifier.verifyTx(proof, input), "Proof is invalid.");

        bytes32 key = generateKey(user, tokenId, input);

        require(uniqueSolns[key].user == address(0), "Solution already exists.");

        addSolution( user, tokenId, input);

        return super.mint(user, tokenId);
    }

} 