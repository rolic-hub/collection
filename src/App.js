import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import Create from "./Components/Create";
import Navigation from "./Components/Navbar";
import WalletConnectProvider from "@walletconnect/web3-provider";
import UAuth from "@uauth/js";
import collectionAbi from "./AbiFolder/collection.json";
import marketplaceAbi from "./AbiFolder/Marketplace.json";
import { ethers } from "ethers";
import CollectionView from "./Components/CollectionView";
import NftPage from "./Components/nftPage";
import { create as ipfsHttpClient } from "ipfs-http-client";
import MyNfts from "./Components/myNfts";

const { ethereum } = window;
const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");

function App() {
  const [connect, setConnect] = useState(true);
  const collectionaddress = "0x2FEAbCE36A8b8B4D19CF5b1699a9C6D47df9B1ba";
  const marketplaceAddress = "0xaD12b51bDA5E41B7391CD66eeDD668B4aF2e2b99";
  const [account, setAccount] = useState(localStorage.getItem("account"));
  const [collection, setCollection] = useState();
  const [metamaskSigner, setMaskSigner] = useState();
  const [marketplace, setMarketPlace] = useState({});

  const coverPhotos = [];

  const web3handler = async () => {
    const accounts = await ethereum.request({
      method: "eth_requestAccounts",
    });
    setAccount(localStorage.setItem("account", accounts[0]));

    setConnect(false);
    const provider = new ethers.providers.Web3Provider(ethereum);

    const signer = await provider.getSigner();
    setMaskSigner(signer);
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
    setMaskSigner(Wsigner);
    const accounts = Wsigner.getAddress();
    setAccount(localStorage.setItem("account", accounts));

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
      setAccount(localStorage.setItem("account", accounts));
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

  const getImage = async (event, address) => {
    event.preventDefault();
    const file = event.target.files[0];
    if (typeof file !== "undefined") {
      try {
        const result = await client.add(file);
        console.log(result);
        //  setImage(`);
        const mapping = new Map();
        mapping.set(address, result.path);
      } catch (error) {
        console.log("ipfs image upload error: ", error);
      }
    }
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
              coverPhotos={coverPhotos}
            />
          }
        />
        <Route
          path="/create"
          element={<Create collection={collection} getImage={getImage} />}
        />
        <Route
          path="/collection/:address"
          element={
            <CollectionView
              collection={collection}
              account={account}
              metamaskSigner={metamaskSigner}
              coverPhotos={coverPhotos}
            />
          }
        />
        <Route
          path="/nft/:address/:tokenId"
          element={
            <NftPage metamaskSigner={metamaskSigner} account={account} />
          }
        />
        <Route
          path="/my-Nfts"
          element={<MyNfts account={account} collection={collection} />}
        />
      </Routes>
    </div>
  );
}

export default App;
