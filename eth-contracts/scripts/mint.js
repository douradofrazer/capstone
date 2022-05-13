const SolnSquareVerifier = artifacts.require("SolnSquareVerifier");
const CONTRACT_ADDRESS = "0x5A746a757dD183c648cfb7619307C3f46c5a55F6";
const TOKEN_TO_MINT = 5;
const INDEX_START = 0;

module.exports = function() {
  web3.eth.getAccounts(async (error, accounts) => {
    const ownerAddress = accounts[0];
    const contract = await SolnSquareVerifier.at(CONTRACT_ADDRESS);
    for (let i = INDEX_START; i < INDEX_START + TOKEN_TO_MINT; i++) {
      const result = await contract.mint(ownerAddress, i);
      console.log(`Token minted, index: ${i}\n\ttx: ${result.tx}`);
    }
    console.log(`Tokens successfully minted`);
  });
};