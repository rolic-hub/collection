import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import Create from "./Components/Create";
import Navigation from "./Components/Navbar";
import WalletConnectProvider from "@walletconnect/web3-provider";
import UAuth from "@uauth/js";
import collectionAbi from "./AbiFolder/collection.json";
import marketplaceAbi from "./AbiFolder/Marketplace.json";
import { ethers } from "ethers";

const { ethereum } = window;
// export const signer = () => {
//   const provider = new ethers.providers.web3Provider(ethereum);
//   const signer = provider.getSigner();
//   return signer;
// };

function App() {
  const [connect, setConnect] = useState(true);
  const collectionaddress = "0x2FEAbCE36A8b8B4D19CF5b1699a9C6D47df9B1ba";
  const marketplaceAddress = "0xaD12b51bDA5E41B7391CD66eeDD668B4aF2e2b99";
  const [account, setAccount] = useState("");
  const [collection, setCollection] = useState();
  const [marketplace, setMarketPlace] = useState({});

  const web3handler = async () => {
    const accounts = await ethereum.request({
      method: "eth_requestAccounts",
    });
    setAccount(accounts[0]);
    setConnect(false);
     const provider = new ethers.providers.Web3Provider(ethereum);
     console.log(await provider.getCode(collectionaddress))
     const signer = await provider.getSigner();
    loadContract(signer);
  };

  const walletC = async () => {
    const provider = new WalletConnectProvider({
      infuraId: "27e484dcd9e3efcfd25a83a78777cdf1",
    });
    //  Enable session (triggers QR Code modal)
    await provider.enable();
    await provider.request({ payload: "eth_requestAccounts" });

    const web3Provider = new ethers.providers.Web3Provider(provider);
    const Wsigner = web3Provider.getSigner();
    const accounts = Wsigner.getAddress();
    setAccount(accounts);
    setConnect(false);
    
    loadContract(Wsigner);
  };

  const unsLogin = async () => {
    try {
      const uauth = new UAuth({
        clientID: "0bfe1e7223d44a8c80c6c30dfe52d12b",
        scope: "openid email wallet",
        redirectUri: "https://localhost:3000/callback",
      });

      const authorization = await uauth.loginWithPopup();
      const accounts = authorization.idToken.address;
      setAccount(accounts);
      setConnect(false);
      loadContract();
    } catch (error) {
      console.log(error);
    }
  };

  const loadContract = (signer) => {
    const getCollectioncontract = new ethers.Contract(
      collectionaddress,
      collectionAbi.abi,
      signer
    );
    setCollection(getCollectioncontract);
    const getMarketcontract = new ethers.Contract(
      marketplaceAddress,
      marketplaceAbi.abi,
      signer
    );
    setMarketPlace(getMarketcontract);
  };

  
  return (
    <div className="App">
      <Navigation
        web3handler={web3handler}
        walletC={walletC}
        unsLogin={unsLogin}
        connect={connect}
        setConnect={setConnect}
        account={account}
      />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              collection={collection}
              marketplace={marketplace}
              account={account}
            />
          }
        />
        <Route path="/create" element={<Create collection={collection} />} />
      </Routes>
    </div>
  );
}

export default App;
