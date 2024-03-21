"use client";
import { BrowserProvider } from "ethers";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getContract } from "../config";

export default function Home() {
  const [walletKey, setwalletKey] = useState("");
  const [currentData, setcurrentData] = useState("");

  const connectWallet = async () => {
    const { ethereum } = window as any;
    const accounts = await ethereum.request({
      method: "eth_requestAccounts",
    });
    setwalletKey(accounts[0]);
  };
  //<Minting>
  const [mintingAmount, setMintingAmount] = useState<number>();
  const [submitted, setSubmitted] = useState(false);
  const [transactionHash, setTransactionHash] = useState("");
  
  const mintCoin = async () => {
    const { ethereum } = window as any;
    const provider = new BrowserProvider(ethereum);
    const signer = await provider.getSigner();
    const contract = getContract(signer);
    try {
      const tx = await contract.mint(signer, mintingAmount);
      await tx.wait();
      setSubmitted(true);
      setTransactionHash(tx.hash);
    } catch (e: any) {
      const decodedError = contract.interface.parseError(e.data);
      alert(`Minting failed: ${decodedError?.args}`);
    }
  };
  const mintAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (!isNaN(Number(inputValue))) {
      setMintingAmount(Number(inputValue));
      console.log(inputValue);
    } else {
      setMintingAmount(0);
    }
  };
  //</Minting>

  //<Staking>
  const [stakingAmount, setStakingAmount] = useState<number>();
  const stakeCoin = async () => {
    const { ethereum } = window as any;
    const provider = new BrowserProvider(ethereum);
    const signer = await provider.getSigner();
    const contract = getContract(signer);
    try {
      const tx = await contract.stake(stakingAmount);
      await tx.wait();
      setSubmitted(true);
      setTransactionHash(tx.hash);
    } catch (e: any) {
      const decodedError = contract.interface.parseError(e.data);
      alert(`Minting failed: ${decodedError?.args}`);
    }
  };
  const stakeAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (!isNaN(Number(inputValue))) {
      setStakingAmount(Number(inputValue));
      console.log(inputValue);
    } else {
      setStakingAmount(0);
    }
  };
  //</Staking>
 
  //<Withdraw>
  const withdrawCoin = async () => {
    const { ethereum } = window as any;
    const provider = new BrowserProvider(ethereum);
    const signer = await provider.getSigner();
    const contract = getContract(signer);
    try {
      const tx = await contract.withdraw();
      await tx.wait();
      setSubmitted(true);
      setTransactionHash(tx.hash);
    } catch (e: any) {
      const decodedError = contract.interface.parseError(e.data);
      alert(`Minting failed: ${decodedError?.args}`);
    }
  };
  //</Withdraw>
  //<Import Token>
  const importToken = async() => {
    const {ethereum} = window as any;
    const tokenAddress = "0x65B5DF6BB4A756EbE484faf0E3fa1e12c9874803"; //contract add
    const tokenSymbol = "WIN";
    const tokenDecimal = 18;

    try{
      const wasAdded = await ethereum.request({
        method: "wallet_watchAsset",
        params: {
          type: "ERC20",
          options: {
            address: tokenAddress,
            symbol: tokenSymbol,
            decimals: tokenDecimal,
          },
        },
      });
    }
    catch(error){
      console.log(error);
    }
  };
  //</Import Token>

 return (
    <main className="flex flex-col items-center justify-center">
      <p className="text-3xl mt-10">
         WIN Token 
      </p>
  
      <div className="flex flex-col items-center justify-center h-1/4">
        <button onClick={() => { connectWallet(); }} className="btn-primary mt-5">
          {walletKey !== "" ? walletKey : "Connect Wallet"}
        </button>
  
        <button onClick={importToken} className="btn-primary mt-5">
          Import Token
        </button>
      </div>
  
      <div className="flex flex-col items-center justify-center mt-5">
        <form>
          <label htmlFor="mintAmount">Input Amount To Mint:</label><br/>
        </form>
        <input
          type="number"
          id="mintAmount"
          value={mintingAmount}
          onChange={(e) => mintAmountChange(e)}
          className="input-field"
        />
        <button
          onClick={() => { mintCoin(); }}
          className="btn-primary mt-5">
          Mint Token
        </button>
      </div>
  
      <div className="flex flex-col items-center justify-center mt-5">
        <form>
          <label htmlFor="stakeAmount">Input Amount To Stake:</label><br/>
        </form>
        <input
          type="number"
          id="stakeAmount"
          value={stakingAmount}
          onChange={(e) => stakeAmountChange(e)}
          className="input-field"
        />
  
        <button
          onClick={stakeCoin}
          className="btn-primary mt-5">
          Stake It
        </button>
      </div>
  
      <div className="flex flex-col items-center justify-center mt-5">
        <p>Wait for at least 1 minute before Withdrawing</p>
        <button
          onClick={withdrawCoin}
          className="btn-primary mt-5">
          Withdraw
        </button>
      </div>
    </main>
  );
}
