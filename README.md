# voting-contract-dashboard
Smart contract on Solidity for Ethereum with dashboard

## Requeriments

First, have an Ethereum node. More info [here](https://github.com/ethereum/go-ethereum/wiki/geth)

Personally, I execute **geth** with this command on my server:

```
geth --rinkeby --rpc --rpcport "8545" --rpcaddr "0.0.0.0" --rpccorsdomain "*" --fast --cache=16 --rpcapi "admin,eth,debug,personal,web3" consol
```

## Installation

    git clone https://github.com/joseluisdominguez/voting-contract-dashboard.git
    cd voting-contract-dashboard
    npm install

## Deploy smart contract

First, you have to display the smart contract, you can find it in:

	voting-contract-dashboard/controllers/voting.sol

In this [web](https://ethereum.github.io/browser-solidity/) there is a simulator in which we can test the intelligent contract.

Here we should get the definition abi.

Once the smart contract is deployed, we must save your address.

## Params

Open file:

	voting-contract-dashboard/controllers/web3Service.js

And write 3 params:

 - URL: Url of our node. ex: http://46.101.164.67:8545
 - addressContrat: address contract deployment
 - interfaceAbi: interface from simulator

## Run dashboard

    npm start
    open address http://localhost:3000
    enjoy...
