# Udacity Blockchain Capstone

This project is about managing Real Estate Marketplace in Etherium Blockchain. Each property is represented by ERC721 Token. before you can mint a token you need to verify that you are the owner of the property. zk-SNARKs is used to create a verification system which can prove you have title to the property without revealing that specific information on the property.Once the token has been verified you will place it on a blockchain market place (OpenSea) for others to purchase.

Versions
 - Truffle : v5.4.26
 - Node : v16.13.2
 - Web3.js : v1.5.3
 - zokrates/zokrates : 1.0.43
  

## Install

To install, download or clone the repo, then:
* `npm install`
  
To compile go  under `eth-contracts` folder then execute :
* `truffle compile`

## launch tests

To run truffle tests:
1. ` ganache-cli -l 10000000000`
2.  In another Terminal : 
    - `cd eth-contracts && truffle test --network development`


## Deployment on Rinkeby

```
   Deploying 'SquareVerifier'
   --------------------------
   > transaction hash:    0xcded970bab7e996aa2c6a788b115af94498ce862011717014c943f2205a65da2
   > Blocks: 1            Seconds: 12
   > contract address:    0x522A9ED0c77Ca59b0ddc4d3C13644cd31823368C
   > block number:        10661442
   > block timestamp:     1652331869
   > account:             0xD10DA32e7560Ef650dAbB392289C48bEA37AcD45
   > balance:             0.20742575
   > gas used:            1199052 (0x124bcc)
   > gas price:           10 gwei
   > value sent:          0 ETH
   > total cost:          0.01199052 ETH


   Deploying 'SolnSquareVerifier'
   ------------------------------
   > transaction hash:    0xe509cf4c1d3c1ccb3421bcad8cb1b99e62f9a9a9d850f739392b44427209a633
   > Blocks: 0            Seconds: 8
   > contract address:    0xb4463A332490274DC4C320A028176b1fbc6Bee1C
   > block number:        10661443
   > block timestamp:     1652331884
   > account:             0xD10DA32e7560Ef650dAbB392289C48bEA37AcD45
   > balance:             0.17075428
   > gas used:            3667147 (0x37f4cb)
   > gas price:           10 gwei
   > value sent:          0 ETH
   > total cost:          0.03667147 ETH


   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:          0.04866199 ETH
```

## Token minting

A simple NodeJS script has been used to mint the 10 tokens. <br>
    `truffle exec scripts\mint.js --network rinkeby`

```
Using network 'rinkeby'.

Token minted, index: 0
        tx: 0x831844bb63c9fd89538042a6497764ee0e508cff544fa64e7c76c36ccd530ba6
Token minted, index: 1
        tx: 0x088016c6223e9939284997ad4b53712481b84330dda9eaec041b63f81cfbdca6
Token minted, index: 2
        tx: 0x743525179b40f5999165b4304b7882eb29f60d9ad4c1908c319f4ef3b4197de6
Token minted, index: 3
        tx: 0x7d08cdfe44a31a5d8631fe6960129aa597530beea0970e09ff20467024baac72
Token minted, index: 4
        tx: 0x97df7e35ca11ce857875906daa945c9adfb772218b1171f99352ee1ad7310e52
Token minted, index: 5
        tx: 0xf695c4d7ecfd9cc378b02349af00dd9e46d262c0390c61b678dfb64a4879dbc4
Token minted, index: 6
        tx: 0x0225647a6374936739e18b4940422fa84e3f6557c40beb4d1068949454523a49
Token minted, index: 7
        tx: 0x74c57e796f8a009ab9c41a58dce765de21f632a021c1707fe2db53ea06540dd2
Token minted, index: 8
        tx: 0x3a07699268cc5ee2e7bbcdb20b956ca991ec21140208445aaa58ab18c1acc47d
Token minted, index: 9
        tx: 0xcedf3be592347a0b1447bb13018053b3370ccd34620dd74abbbe00e04c020cf7
Tokens successfully minted
```

##  ZoKrates 
ZoKrates is a toolbox for zkSNARKs on Ethereum. It helps you use verifiable computation in your DApp, from the specification of your program in a high level language to generating proofs of computation to verifying those proofs in Solidity.


1. We will prove knowledge of the square root a of a number b: <br>
    `./zokrates/code/square/square.code`
```
def main(private field a, field b) -> (field):
  field result = if a * a == b then 1 else 0 fi
  return result
```
2. You can use the zokrates CLI from docker container : <br>
    `docker run -v $PWD:/home/zokrates/code -ti zokrates/zokrates /bin/bash`

3. Then run the different phases of the protocol to generate the solidity verifier :
```bash
# compile
zokrates compile -i zokrates/code/square/square.code
# perform the setup phase
zokrates setup
# execute the program
zokrates compute-witness -a 3 9
# generate a proof of computation
zokrates generate-proof
# export a solidity verifier
zokrates export-verifier
```


# Project Resources

* [Remix - Solidity IDE](https://remix.ethereum.org/)
* [Visual Studio Code](https://code.visualstudio.com/)
* [Truffle Framework](https://truffleframework.com/)
* [Ganache - One Click Blockchain](https://truffleframework.com/ganache)
* [Open Zeppelin ](https://openzeppelin.org/)
* [Interactive zero knowledge 3-colorability demonstration](http://web.mit.edu/~ezyang/Public/graph/svg.html)
* [Docker](https://docs.docker.com/install/)
* [ZoKrates](https://github.com/Zokrates/ZoKrates)
