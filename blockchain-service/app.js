require("dotenv").config();
const express = require("express");
const app = express();
var cors = require("cors");
const Web3 = require("web3");
const routes = require("./routes");

app.use(express.json());
app.use(cors());

connectToWeb3 = () => {
  const provider = new Web3.providers.HttpProvider(
    `https://ropsten.infura.io/v3/${process.env.INFURA_KEY}`
  );
  const web3 = new Web3(provider);
  const account1 = process.env.METAMASK_ACCTOUNT;
  web3.eth.defaultAccount = account1;

  const abi = [
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "bytes32",
          "name": "_checksum",
          "type": "bytes32"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "data",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "eventDetails",
          "type": "string"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "_setBy",
          "type": "address"
        }
      ],
      "name": "NewEntry",
      "type": "event"
    },
    {
      "constant": true,
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "",
          "type": "bytes32"
        }
      ],
      "name": "myMapping",
      "outputs": [
        {
          "internalType": "string",
          "name": "data",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "eventDetails",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "timestamp",
          "type": "uint256"
        },
        {
          "internalType": "bytes32",
          "name": "checkSum",
          "type": "bytes32"
        },
        {
          "internalType": "bool",
          "name": "isSet",
          "type": "bool"
        },
        {
          "internalType": "address",
          "name": "setBy",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "_checksum",
          "type": "bytes32"
        },
        {
          "internalType": "string",
          "name": "_data",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_eventDetails",
          "type": "string"
        }
      ],
      "name": "createEvent",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "_checksum",
          "type": "bytes32"
        }
      ],
      "name": "getEvent",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    }
  ];

  const contract = new web3.eth.Contract(abi, process.env.CONTRACT_ADRESS);

  web3.eth.net
    .isListening()
    .then(() => console.log("web3 is connected"))
    .catch((e) => console.log("Wow. Something went wrong"));

  web3.eth.accounts.wallet.add(process.env.PRIVATE_KEY);
  return { web3, contract };
};

app.listen(process.env.PORT || 8082, async () => {
  console.log(`blockchain service - ${process.env.PORT} / 8082 - started`);
  data = await connectToWeb3();
  web3 = data.web3;
  contract = data.contract;
  routes(app, web3, contract);
});
