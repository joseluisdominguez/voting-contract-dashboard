"use strict";
// Doc: http://web3js.readthedocs.io/en/1.0/web3-eth-contract.html

// Requirements
var Web3 = require('web3');
var fs = require('fs');

// Local vars
const URL = "http://46.101.164.67:8545";
var web3 = new Web3(new Web3.providers.HttpProvider(URL));
const addressContrat = "0xf7e0f1a6c60545b4980714af754163367f70b758";
const interfaceAbi = [{"constant":false,"inputs":[{"name":"sender","type":"address"}],"name":"simulateBlankVote","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"votersRegistration","outputs":[{"name":"exists","type":"bool"},{"name":"voted","type":"bool"},{"name":"timestamp","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"candidateList","outputs":[{"name":"exists","type":"bool"},{"name":"name","type":"bytes32"},{"name":"description","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"sender","type":"address"}],"name":"iVoted","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"sender","type":"address"},{"name":"candidate","type":"bytes32"}],"name":"simulateVote","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"blankVotes","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"votesReceived","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"sender","type":"address"}],"name":"iAmRegistered","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"getPoliticalCount","outputs":[{"name":"count","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"endTimestamp","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"row","type":"uint256"}],"name":"getVotersAtIndex","outputs":[{"name":"","type":"address"},{"name":"","type":"bool"},{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"politicalNames","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"getVotersCount","outputs":[{"name":"count","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"blankVote","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"voteForCandidate","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"voters","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"startTimestamp","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"row","type":"uint256"}],"name":"getPoliticalAtIndex","outputs":[{"name":"","type":"bytes32"},{"name":"","type":"bytes32"},{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"politicalParties","type":"bytes32[]"},{"name":"candidateNames","type":"bytes32[]"},{"name":"candidateDescriptions","type":"bytes32[]"},{"name":"votersAddress","type":"address[]"},{"name":"start","type":"uint256"},{"name":"end","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"}];
const contractByte = "0x606060405234156200001057600080fd5b604051620014e1380380620014e1833981016040528080518201919060200180518201919060200180518201919060200180518201919060200180519060200190919080519060200190919050506000808360068190555082600781905550876005908051906020019062000087929190620002cc565b508460039080519060200190620000a092919062000324565b50600091505b8751821015620001bb576001600460008a85815181101515620000c557fe5b906020019060200201516000191660001916815260200190815260200160002060000160006101000a81548160ff02191690831515021790555086828151811015156200010e57fe5b90602001906020020151600460008a858151811015156200012b57fe5b9060200190602002015160001916600019168152602001908152602001600020600101816000191690555085828151811015156200016557fe5b90602001906020020151600460008a858151811015156200018257fe5b906020019060200201516000191660001916815260200190815260200160002060020181600019169055508180600101925050620000a6565b600090505b8451811015620002be576001600260008784815181101515620001df57fe5b9060200190602002015173ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000160006101000a81548160ff02191690831515021790555060006002600087848151811015156200025257fe5b9060200190602002015173ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000160016101000a81548160ff0219169083151502179055508080600101915050620001c0565b505050505050505062000421565b82805482825590600052602060002090810192821562000311579160200282015b8281111562000310578251829060001916905591602001919060010190620002ed565b5b509050620003209190620003b3565b5090565b828054828255906000526020600020908101928215620003a0579160200282015b828111156200039f5782518260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055509160200191906001019062000345565b5b509050620003af9190620003db565b5090565b620003d891905b80821115620003d4576000816000905550600101620003ba565b5090565b90565b6200041e91905b808211156200041a57600081816101000a81549073ffffffffffffffffffffffffffffffffffffffff021916905550600101620003e2565b5090565b90565b6110b080620004316000396000f3006060604052600436106100fc576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680631037db8d1461010157806316d8bab9146101525780631b1dce0d146101b557806337337e04146102125780634bc4ef45146102635780636a316c9d146102c15780637021939f146102f05780637f45752714610331578063a276825b14610382578063a85adeab146103ab578063b534c165146103d4578063ba15c67d14610449578063c0f2a77714610488578063c5f8995c146104b1578063cc9ab267146104de578063da58c7d91461051d578063e6fd48bc14610580578063fee4f318146105a9575b600080fd5b341561010c57600080fd5b610138600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610606565b604051808215151515815260200191505060405180910390f35b341561015d57600080fd5b610189600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610731565b604051808415151515815260200183151515158152602001828152602001935050505060405180910390f35b34156101c057600080fd5b6101da600480803560001916906020019091905050610775565b604051808415151515815260200183600019166000191681526020018260001916600019168152602001935050505060405180910390f35b341561021d57600080fd5b610249600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919050506107ac565b604051808215151515815260200191505060405180910390f35b341561026e57600080fd5b6102a7600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919080356000191690602001909190505061081d565b604051808215151515815260200191505060405180910390f35b34156102cc57600080fd5b6102d4610977565b604051808260ff1660ff16815260200191505060405180910390f35b34156102fb57600080fd5b61031560048080356000191690602001909190505061098a565b604051808260ff1660ff16815260200191505060405180910390f35b341561033c57600080fd5b610368600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919050506109aa565b604051808215151515815260200191505060405180910390f35b341561038d57600080fd5b610395610a1b565b6040518082815260200191505060405180910390f35b34156103b657600080fd5b6103be610a28565b6040518082815260200191505060405180910390f35b34156103df57600080fd5b6103f56004808035906020019091905050610a2e565b604051808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200183151515158152602001828152602001935050505060405180910390f35b341561045457600080fd5b61046a6004808035906020019091905050610c1e565b60405180826000191660001916815260200191505060405180910390f35b341561049357600080fd5b61049b610c42565b6040518082815260200191505060405180910390f35b34156104bc57600080fd5b6104c4610c4f565b604051808215151515815260200191505060405180910390f35b34156104e957600080fd5b610503600480803560001916906020019091905050610d78565b604051808215151515815260200191505060405180910390f35b341561052857600080fd5b61053e6004808035906020019091905050610ed1565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b341561058b57600080fd5b610593610f10565b6040518082815260200191505060405180910390f35b34156105b457600080fd5b6105ca6004808035906020019091905050610f16565b60405180846000191660001916815260200183600019166000191681526020018260001916600019168152602001935050505060405180910390f35b600080151561061361100d565b1515141561062057600080fd5b6000151561062d836109aa565b1515141561063a57600080fd5b60011515610647836107ac565b1515141561065457600080fd5b6001600081819054906101000a900460ff168092919060010191906101000a81548160ff021916908360ff160217905550506001600260008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000160016101000a81548160ff02191690831515021790555042600260008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206001018190555060019050919050565b60026020528060005260406000206000915090508060000160009054906101000a900460ff16908060000160019054906101000a900460ff16908060010154905083565b60046020528060005260406000206000915090508060000160009054906101000a900460ff16908060010154908060020154905083565b600060011515600260008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000160019054906101000a900460ff16151514156108135760019050610818565b600090505b919050565b600080151561082a61100d565b1515141561083757600080fd5b6000151561084483611037565b1515141561085157600080fd5b6000151561085e846109aa565b1515141561086b57600080fd5b60011515610878846107ac565b1515141561088557600080fd5b6001600080846000191660001916815260200190815260200160002060008282829054906101000a900460ff160192506101000a81548160ff021916908360ff1602179055506001600260008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000160016101000a81548160ff02191690831515021790555042600260008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600101819055506001905092915050565b600160009054906101000a900460ff1681565b60006020528060005260406000206000915054906101000a900460ff1681565b600060011515600260008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000160009054906101000a900460ff1615151415610a115760019050610a16565b600090505b919050565b6000600580549050905090565b60075481565b60008060006001151560026000600387815481101515610a4a57fe5b906000526020600020900160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000160009054906101000a900460ff161515141515610acf57600080fd5b600384815481101515610ade57fe5b906000526020600020900160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1660026000600387815481101515610b1d57fe5b906000526020600020900160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000160019054906101000a900460ff1660026000600388815481101515610ba757fe5b906000526020600020900160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600101549250925092509193909250565b600581815481101515610c2d57fe5b90600052602060002090016000915090505481565b6000600380549050905090565b6000801515610c5c61100d565b15151415610c6957600080fd5b60001515610c76336109aa565b15151415610c8357600080fd5b60011515610c90336107ac565b15151415610c9d57600080fd5b6001600081819054906101000a900460ff168092919060010191906101000a81548160ff021916908360ff160217905550506001600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000160016101000a81548160ff02191690831515021790555042600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600101819055506001905090565b6000801515610d8561100d565b15151415610d9257600080fd5b60001515610d9f83611037565b15151415610dac57600080fd5b60001515610db9336109aa565b15151415610dc657600080fd5b60011515610dd3336107ac565b15151415610de057600080fd5b6001600080846000191660001916815260200190815260200160002060008282829054906101000a900460ff160192506101000a81548160ff021916908360ff1602179055506001600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000160016101000a81548160ff02191690831515021790555042600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206001018190555060019050919050565b600381815481101515610ee057fe5b90600052602060002090016000915054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60065481565b60008060006001151560046000600587815481101515610f3257fe5b9060005260206000209001546000191660001916815260200190815260200160002060000160009054906101000a900460ff161515141515610f7357600080fd5b600584815481101515610f8257fe5b90600052602060002090015460046000600587815481101515610fa157fe5b906000526020600020900154600019166000191681526020019081526020016000206001015460046000600588815481101515610fda57fe5b90600052602060002090015460001916600019168152602001908152602001600020600201549250925092509193909250565b600042600654108015611021575042600754115b1561102f5760019050611034565b600090505b90565b60006001151560046000846000191660001916815260200190815260200160002060000160009054906101000a900460ff161515141561107a576001905061107f565b600090505b9190505600a165627a7a72305820183abbea05be46f938f9cbab1a9187ca023c9536da64591ea711fd5250225090002900000000000000000000000000000000000000000000000000000000000000c00000000000000000000000000000000000000000000000000000000000000120000000000000000000000000000000000000000000000000000000000000018000000000000000000000000000000000000000000000000000000000000001e0000000000000000000000000000000000000000000000000000000005a1610b1000000000000000000000000000000000000000000000000000000005a40f3ec0000000000000000000000000000000000000000000000000000000000000002505000000000000000000000000000000000000000000000000000000000000050534f450000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000024a6f7365000000000000000000000000000000000000000000000000000000005061636f000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002446573310000000000000000000000000000000000000000000000000000000044657332000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000003000000000000000000000000c9531cc2919daa4be9bf4b77fa1d4ee1307ed0bd0000000000000000000000005f01c807165007ea15363cde47f6431379023d79000000000000000000000000be443dfd767ab1275a031faa5e513b3ba398a2ea";
const params = '["PP", "PSOE"], ["Jose", "Paco"], ["Des1", "Des2"], ["0xc9531cc2919daa4be9bf4b77fa1d4ee1307ed0bd","0x5f01c807165007ea15363cde47f6431379023d79","0xbE443Dfd767Ab1275a031faA5E513B3bA398A2ea"], 1511395505, 1514206188';
const paramsBytes = "dsadsada Terminar de poner esto bonito";
const defaultDataUnlockAccount = {
    pass: "12345678",
    time: 500
};
var myContract = new web3.eth.Contract(interfaceAbi, addressContrat);
var data = {
    start: null,
    end: null,
    politicalData: [],
    voterData: [],
    methods: null,
    address: null,
    node: null,
    contractSource: {}
};


// Set attributes data
data.node = URL;
data.address = addressContrat;
data.methods = getMethodsContract();

function readContract() {
    return new Promise(function(resolve, reject) {
        fs.readFile(__dirname + '/voting.sol', 'utf8', function (err, data) {
            if (err) {
                reject(err);
            }
            resolve(data);
        });
    });
};

function getMethodsContract() {
    var methodsCode = new Array();
    var methodsName = new Array();
    Object.keys(myContract.methods).forEach(function(key, index) {
        if((index+1)%3 === 0) {
            methodsName.push(key);
        }
        if((index+2)%3 === 0) {
            methodsCode.push(key);
        }
    });

    return {
        code: methodsCode,
        name: methodsName
    };
}

function decode(string) {
    return web3.utils.hexToString(string);
}

function encode(string) {
    return web3.utils.stringToHex(string);
}

function convertDate(timestamp) {
    var d = new Date(timestamp * 1000);
    return d.toLocaleDateString() + " " + d.toLocaleTimeString();
}

function getBlankVotes() {
    return new Promise(function(resolve, reject) {
        myContract.methods.blankVotes().call().then(number => {
            resolve(parseInt(number));
        }).catch(err => {
            reject(err.message);
        })
    });
}

function getStartTime() {
    return new Promise(function(resolve, reject) {
        myContract.methods.startTimestamp().call().then(time => {
            resolve(convertDate(time));
        }).catch(err => {
            reject(err.message);
        })
    });
}

function getEndTime() {
    return new Promise(function(resolve, reject) {
        myContract.methods.endTimestamp().call().then(time => {
            resolve(convertDate(time));
        }).catch(err => {
            reject(err.message);
        })
    });
}

function getPoliticalInfo() {
    var cont = 0;
    var totalVotes = 0;
    return new Promise(function (resolve, reject) {
        myContract.methods.getPoliticalCount().call().then(number => {
            for(var i=0; i<number; i++) {
                myContract.methods.getPoliticalAtIndex(i).call().then(candidateData => {
                    myContract.methods.votesReceived(candidateData[0]).call().then(numVotes => {
                        data.politicalData.push({
                            political: decode(candidateData[0]),
                            candidate: decode(candidateData[1]),
                            description: decode(candidateData[2]),
                            votes: parseInt(numVotes)
                        });
                        cont++;
                        totalVotes += parseInt(numVotes);

                        if(cont.toString() === number) {
                            resolve(totalVotes);
                        }
                    });
                }).catch(err => {
                    reject(err); // reject
                });
            }
        }).catch(err => {
            reject(err); // reject
        });
    })
}

function getVotersInfo() {
    var cont = 0;
    return new Promise(function (resolve, reject) {
        myContract.methods.getVotersCount().call().then(number => {
            for(var i=0; i<number; i++) {
                myContract.methods.getVotersAtIndex(i).call().then(voterData => {
                    var dateVoted = "N/A";

                    if(voterData[2] != 0) {
                        dateVoted = convertDate(voterData[2]);
                    }

                    data.voterData.push({
                        address: voterData[0],
                        voted: voterData[1],
                        timestamp: dateVoted
                    });
                    cont++;

                    if(cont.toString() === number) {
                        resolve(1);
                    }
                }).catch(err => {
                    reject(err); // reject
                });
            }
        }).catch(err => {
            reject(err); // reject
        });
    })
}

const callbacks = [
    getStartTime(),
    getEndTime(),
    getPoliticalInfo(),
    getVotersInfo(),
    getBlankVotes(),
    readContract()
];

exports.getData = function() {
    return new Promise(function (resolve, reject) {
        Promise.all(callbacks).then(allData => {
            data.start = allData[0];
            data.end = allData[1];
            data.totalVotes = allData[2];
            data.blankVotes = allData[4];
            data.contractSource.source = allData[5];
            data.contractSource.interface = JSON.stringify(interfaceAbi);
            data.contractSource.code = contractByte;
            data.contractSource.params = params;
            data.contractSource.paramsBytes = paramsBytes;


            resolve(data);
        }).catch(err => {
            reject(err.message);
        });
    });
};

exports.keccak256 = function(str) {
    return web3.utils.keccak256(str);
};

exports.simulateVoting = function(account, political) {
    return new Promise(function (resolve, reject) {

        getEndTime().then(endDate => {
            var fin = new Date(endDate).getTime();
            var now = new Date().getTime();

            if(now > fin) {
                reject(1);
                return;
            }

            web3.eth.getCoinbase().then(coinbase => {
                web3.eth.personal.unlockAccount(coinbase, defaultDataUnlockAccount.pass, defaultDataUnlockAccount.time).then(data => {
                    // Se ha logado correctamente la cuenta base, hacemos el voto
                    if (political === "-1") {
                        // Simular en blanco
                        myContract.methods.simulateBlankVote(account).estimateGas().then(gasStimate => {
                            myContract.methods.simulateBlankVote(account).send({
                                from: coinbase,
                                gas: gasStimate,
                                gasPrice: "0x9502F9000"
                            }).then(data => {
                                // Revisar si esto es correcto, puede ser por el reject del contrato
                                resolve(data);
                            }).catch(err => {
                                reject(err);
                                return;
                            });
                        }).catch(err => {
                            reject(err);
                            return;
                        });
                    } else {
                        // Simular voto

                        myContract.methods.simulateVote(account, encode(political)).estimateGas().then(gasStimate => {
                            myContract.methods.simulateVote(account, encode(political)).send({
                                from: coinbase,
                                gas: gasStimate,
                                gasPrice: "0x9502F9000"
                            }).then(data => {
                                // Revisar si esto es correcto, puede ser por el reject del contrato
                                resolve(data);
                            }).catch(err => {
                                reject(err);
                                return;
                            });
                        }).catch(err => {
                            reject(err);
                            return;
                        });
                    }


                }).catch(err => {
                    reject(err);
                    return;
                });
            });

        });

    });
};