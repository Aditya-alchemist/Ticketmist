import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import axios from "axios";
import {
  OnchainKitProvider,
  useOnchainKit,
} from "@coinbase/onchainkit";
import { baseSepolia } from "viem/chains"; // Import baseSepolia
import "./App.css";


const CONTRACT_ADDRESS = "0x9AE3c4605F4f46A00484A471f1d60d2d85817bc3";
const PINATA_API_KEY = "223553f88ea60420fae4";
const PINATA_SECRET_KEY = "36b531be959f28db2b3a9b8672fe4243dd82ccf518624ebbffd1b5b1280ec78d";

const TICKET_IMAGES = [
  {
    id: 1,
    name: "VIP Ticket",
    description: "VIP Access with exclusive perks",
    price: "0.001",
    imageCID: "bafybeihhaivmosip2cjsmitl7c4kravijycx7vcroi6khymgmykn2oc6m4",
  },
  {
    id: 2,
    name: "Regular Ticket",
    description: "Standard event access",
    price: "0.001",
    imageCID: "bafybeiadkug253mp7k6tyj3c3yy4pdhu5msnew5iqfotgmzya3mxblisqq",
  },
  {
    id: 3,
    name: "Regular Ticket",
    description: "Standard event access",
    price: "0.001",
    imageCID: "bafkreieqtyraljoiaq6yrzmmh3jjljaoqmd2upr2xrkvea2yltcpfhtr5m",
  },
  {
    id: 4,
    name: "Regular Ticket",
    description: "Standard event access",
    price: "0.001",
    imageCID: "bafkreibnjbhrz6crn6s4qba3dcnxocdxz3lmpp4zdr4lcr25mvwgf744p4",
  },
  {
    id: 5,
    name: "Regular Ticket",
    description: "Standard event access",
    price: "0.001",
    imageCID: "bafybeie2mpq7yeusflqse3mics5pqrzwnhtisvlxq4fx33g6jctg4vs23q",
  },
  {
    id: 6,
    name: "Regular Ticket",
    description: "Standard event access",
    price: "0.001",
    imageCID: "bafybeihcmtugjg7ovtoyfwzgcyby43cofvlj654x4pfqq7og4c5kfwsbnm",
  },
  {
    id: 7,
    name: "Regular Ticket",
    description: "Standard event access",
    price: "0.001",
    imageCID: "bafybeihx5adynixnqzley4twbpixgcuxnb5e4ectqilwznlyjuciunyrfq",
  },
  {
    id: 8,
    name: "Regular Ticket",
    description: "Standard event access",
    price: "0.001",
    imageCID: "bafkreihfxemusydlugmcoun4c4j2js72gui4alqgsc64p6x255w4gm2kzi",
  },
];

const TICKET_NFT_ABI = 

[
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "symbol",
				"type": "string"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "sender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "ERC721IncorrectOwner",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "operator",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "ERC721InsufficientApproval",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "approver",
				"type": "address"
			}
		],
		"name": "ERC721InvalidApprover",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "operator",
				"type": "address"
			}
		],
		"name": "ERC721InvalidOperator",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "ERC721InvalidOwner",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "receiver",
				"type": "address"
			}
		],
		"name": "ERC721InvalidReceiver",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "sender",
				"type": "address"
			}
		],
		"name": "ERC721InvalidSender",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "ERC721NonexistentToken",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "OwnableInvalidOwner",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "OwnableUnauthorizedAccount",
		"type": "error"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "approved",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "operator",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "bool",
				"name": "approved",
				"type": "bool"
			}
		],
		"name": "ApprovalForAll",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "_fromTokenId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "_toTokenId",
				"type": "uint256"
			}
		],
		"name": "BatchMetadataUpdate",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "_tokenId",
				"type": "uint256"
			}
		],
		"name": "MetadataUpdate",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "buyer",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "TicketMinted",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "MAX_TICKETS",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "MINT_FEE",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "getApproved",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getCurrentTicketCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getLastBuyerInfo",
		"outputs": [
			{
				"internalType": "address",
				"name": "buyer",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getOwner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "operator",
				"type": "address"
			}
		],
		"name": "isApprovedForAll",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "lastBuyer",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "lastTokenId",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "uri",
				"type": "string"
			}
		],
		"name": "mintTicket",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "ownerOf",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "safeTransferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"internalType": "bytes",
				"name": "data",
				"type": "bytes"
			}
		],
		"name": "safeTransferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "operator",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "approved",
				"type": "bool"
			}
		],
		"name": "setApprovalForAll",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes4",
				"name": "interfaceId",
				"type": "bytes4"
			}
		],
		"name": "supportsInterface",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "tokenURI",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "withdraw",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
];

function App() {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState("");
  const [isOwner, setIsOwner] = useState(false);
  const [ticketCount, setTicketCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [metadataHash, setMetadataHash] = useState("");

  const { chainId } = useOnchainKit(); // Using OnchainKit only for chainId

  useEffect(() => {
    checkWalletConnection();
  }, []);

  const checkWalletConnection = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: "eth_accounts" });
        if (accounts.length > 0) {
          await connectWallet();
        }
      } catch (err) {
        console.error("Error checking wallet:", err);
        setError("Error checking wallet: " + err.message);
      }
    } else {
      setError("No Ethereum provider detected. Please install MetaMask.");
    }
  };

  const connectWallet = async () => {
    try {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      const account = accounts[0];
      setAccount(account);

      const baseSepoliaChainId = '0x14a34';
      if (chainId !== baseSepoliaChainId) {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: baseSepoliaChainId }],
        });
      }

      const prov = new ethers.BrowserProvider(window.ethereum);
      const sign = await prov.getSigner();
      const nftContract = new ethers.Contract(CONTRACT_ADDRESS, TICKET_NFT_ABI, sign);

      setProvider(prov);
      setSigner(sign);
      setContract(nftContract);

      const owner = await nftContract.owner();
      console.log("Contract owner:", owner);
      setIsOwner(owner.toLowerCase() === account.toLowerCase());

      const count = await nftContract.getCurrentTicketCount();
      console.log("Ticket count:", count.toString());
      setTicketCount(Number(count));

      window.ethereum.on("accountsChanged", handleAccountChange);
    } catch (err) {
      console.error("BaseSepolia not initalized in wallet", err);
      setError("Failed to connect wallet: you have not initalized baseSepolia in your wallet " + err.message);
	  alert("BaseSepolia not initalized in wallet, please add baseSepolia to your wallet and refresh the page");
    }
  };

  const handleAccountChange = async (accounts) => {
    if (accounts.length > 0) {
      setAccount(accounts[0]);
      if (contract) {
        const owner = await contract.owner();
        console.log("Updated owner check:", owner, accounts[0]);
        setIsOwner(owner.toLowerCase() === accounts[0].toLowerCase());
      }
    } else {
      setAccount("");
      setIsOwner(false);
    }
  };

  const createMetadata = async (ticket) => {
    const metadata = {
      name: ticket.name,
      description: ticket.description,
      image: `https://gateway.pinata.cloud/ipfs/${ticket.imageCID}`,
      attributes: [
        { trait_type: "Ticket Type", value: ticket.name },
        { trait_type: "Price", value: ticket.price + " ETH" },
      ],
    };

    try {
      const response = await axios.post(
        "https://api.pinata.cloud/pinning/pinJSONToIPFS",
        metadata,
        {
          headers: {
            "Content-Type": "application/json",
            pinata_api_key: PINATA_API_KEY,
            pinata_secret_api_key: PINATA_SECRET_KEY,
          },
        }
      );
      return response.data.IpfsHash;
    } catch (err) {
      console.error("Error uploading to Pinata:", err);
      throw new Error("Failed to upload metadata to Pinata");
    }
  };

  const mintTicket = async () => {
    if (!selectedTicket || !contract) {
      setError("Please select a ticket ");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const metadataHash = await createMetadata(selectedTicket);
      setMetadataHash(metadataHash);

      const metadataUrl = `https://gateway.pinata.cloud/ipfs/${metadataHash}`;
      console.log("Minting with URL:", metadataUrl, "Value:", ethers.parseEther(selectedTicket.price));

      const tx = await contract.mintTicket(metadataUrl, {
        value: ethers.parseEther(selectedTicket.price),
        gasLimit: 300000, // Added gas limit
      });

      await tx.wait();
      console.log("Transaction confirmed:", tx.hash);

      const newCount = await contract.getCurrentTicketCount();
      setTicketCount(Number(newCount));

      alert(`Ticket minted successfully!\nMetadata IPFS Hash: ${metadataHash}\nTx Hash: ${tx.hash}`);
    } catch (err) {
      console.error("Minting error:");
      setError("Failed to mint ticket: ");
    } finally {
      setLoading(false);
    }
  };

  const withdrawFunds = async () => {
    if (!isOwner || !contract) {
      setError("Only owner can withdraw funds or ensure contract is initialized");
      return;
    }

    setLoading(true);
    try {
      const tx = await contract.withdraw({
        gasLimit: 200000, // Added gas limit
      });
      await tx.wait();
      alert("Funds withdrawn successfully!\nTx Hash: " + tx.hash);
    } catch (err) {
      console.error("Withdraw error:");
      setError("Failed to withdraw: " );
    } finally {
      setLoading(false);
    }
  };

  return (
    <OnchainKitProvider apiKey="GTAbhtO6x3LNwflYEVtFiYFoA4QkrqQx" chain={baseSepolia}>
      <div className="container">
        <h1>NFT Event Tickets</h1>

        {!account ? (
          <button onClick={connectWallet} className="connect-button">
            Connect Wallet
          </button>
        ) : (
          <div className="content">
            <div className="account-info">
              <p>Connected: {account.slice(0, 6)}...{account.slice(-4)}</p>
              {isOwner && <p className="owner-badge">Owner</p>}
            </div>

            <p className="ticket-count">Tickets Minted: {ticketCount}/50</p>

            <div className="ticket-grid">
              {TICKET_IMAGES.map((ticket) => (
                <div
                  key={ticket.id}
                  className={`ticket-card ${selectedTicket?.id === ticket.id ? "selected" : ""}`}
                  onClick={() => setSelectedTicket(ticket)}
                >
                  <img
                    src={`https://gateway.pinata.cloud/ipfs/${ticket.imageCID}`}
                    alt={ticket.name}
                  />
                  <h3>{ticket.name}</h3>
                  <p>{ticket.description}</p>
                  <p className="price">{ticket.price} ETH</p>
                </div>
              ))}
            </div>

            {error && <p className="error">{error}</p>}

            <button
              onClick={mintTicket}
              disabled={loading || !selectedTicket}
              className="mint-button"
            >
              {loading
                ? "Processing..."
                : `Mint Ticket (${selectedTicket?.price || "0.001"} ETH)`}
            </button>

            {isOwner && (
              <button
                onClick={withdrawFunds}
                disabled={loading}
                className="withdraw-button"
              >
                {loading ? "Processing..." : "Withdraw Funds"}
              </button>
            )}

            {metadataHash && (
              <div className="metadata-info">
                <h3>Last Minted Ticket Metadata</h3>
                <p>IPFS Hash: {metadataHash}</p>
                <a
                  href={`https://gateway.pinata.cloud/ipfs/${metadataHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View on IPFS
                </a>
              </div>
            )}
          </div>
        )}
      </div>
    </OnchainKitProvider>
  );
}

export default App;