const SqaureVerifier = artifacts.require('SqaureVerifier');
const SolnSquareVerifier = artifacts.require('SolnSquareVerifier');

let verifierContract;
let solutionContract;

contract('SolnSquareVerifier', async (accounts) => {
    const owner = accounts[0];
    const user1 = accounts[1];
    const proof = require('./proof.json');

    beforeEach('setup contract', async ()=> {
        verifierContract = await SqaureVerifier.new({from: owner});
        solutionContract = await SolnSquareVerifier.new(verifierContract.address, {from : owner});
    })

    // Test if a new solution can be added for contract - SolnSquareVerifier
    it('Test if a new solution can be added for SolnSquareVerifier', async () => {

        let eventEmitted = false;

        await solutionContract.contract.events.SolutionAdded((err, res) => {
            eventEmitted = true
        });


        await solutionContract.addSolution(user1, 1, proof.inputs);

        assert.equal(eventEmitted, true, 'Solution event was not emmited.');
    });

    // Test if an ERC721 token can be minted for contract - SolnSquareVerifier
    it('Test if an ERC721 token can be minted for SolnSquareVerifier', async () => {

        let eventEmitted = false;

        await solutionContract.contract.events.SolutionAdded((err, res) => {
            eventEmitted = true
        });

        let supplyBefore = await solutionContract.totalSupply.call();

        try {
            await solutionContract.mintNFT(proof.proof, proof.inputs, user1, 1, {from: owner});
        } catch (e) {

        }

        let supplyAfter = await solutionContract.totalSupply.call();

        let difference = supplyAfter.toNumber() - supplyBefore.toNumber();

        assert.equal(difference, 1, "Invalid supply.");

        assert.equal(eventEmitted, true, "Solution was not added, possible duplicate.");
    })
});