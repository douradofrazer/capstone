const { assert } = require("chai");

const ERC721Mintable = artifacts.require('REToken');

let acc;
let tokenContract;
let owner;
let user1;
let user2;
let user3;

contract('TestERC721Mintable', async (accounts) => {
    owner = accounts[0];
    user1 = accounts[1];
    user2 = accounts[2];
    user3 = accounts[3];


    describe('match erc721 spec', () => {

        beforeEach(async () => { 
            tokenContract = await ERC721Mintable.new({from: owner});
            // mint multiple tokens
            await tokenContract.mint(owner, 1, {from: owner, gas: 3000000});
            await tokenContract.mint(user1, 2, {from: owner, gas: 3000000});
            await tokenContract.mint(user2, 3, {from: owner, gas: 3000000});
            await tokenContract.mint(user3, 4, {from: owner, gas: 3000000});
        });
 
        it('verify owner of contract', async () => {
            let verifiedOwner = await tokenContract.getOwner.call();
            assert.equal(verifiedOwner, owner, 'owner does not match.')
        });
    
        it('should return total supply', async () => { 
            let totalSupply = await tokenContract.totalSupply.call();
            assert.equal(totalSupply, 4, 'Total supply does not match.')
        })
    
        it('should get token balance', async () => { 
            let balance = await tokenContract.balanceOf.call(user1);
            assert.equal(balance.toNumber(), 1, "Invalid token balance");
        })
    
        // token uri should be complete i.e: https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1
        it('should return token uri', async () => { 
            let tokenUri = await tokenContract.getTokenURI.call(1);
            assert.equal(tokenUri,'https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1', 'Token uri does not match.')
        })
    
        it('should transfer token from one owner to another', async () => { 
            await tokenContract.transferFrom(owner, user1, 1, {from: owner});
            let balanceOwner = await tokenContract.balanceOf.call(owner);
            let balanceUser1 = await tokenContract.balanceOf.call(user1);
            let tokenOwner = await tokenContract.ownerOf.call(1);
            assert.equal(balanceOwner.toNumber(), 0, "Invalid token balance.");
            assert.equal(balanceUser1.toNumber(), 2, "Invalid token balance.");
            assert.equal(tokenOwner, user1, "Incorrect token owner.");
        })
    });
    
    describe('have ownership properties', () => {

        it('should fail when minting when address is not contract owner', async () => { 
            
        })
    
        it('should return contract owner', async () => { 
            
        })
    
    });

});