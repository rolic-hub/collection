import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import Create from "./Components/Create";
import Navigation from "./Components/Navbar";
import WalletConnectProvider from "@walletconnect/web3-provider";
import UAuth from "@uauth/js";
import collectionAbi from "./AbiFolder/collection.json";

import { ethers } from "ethers";
import CollectionView from "./Components/CollectionView";
import NftPage from "./Components/nftPage";

import MyNfts from "./Components/myNfts";
import ToastComp from "./Components/toast";

const { ethereum } = window;

function App() {
  const [connect, setConnect] = useState(true);
  const [show, setShow] = useState(false);
  const collectionaddress = "0x9f6A8494290670B0d6D22E82b965b384B4b6fdc2";

  const [account, setAccount] = useState(localStorage.getItem("account"));
  const [collection, setCollection] = useState();
  const [metamaskSigner, setMaskSigner] = useState();
  

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
    try {
      setConnect(false);
      await provider.enable();
      await provider.request({ payload: "eth_requestAccounts" });

      const web3Provider = new ethers.providers.Web3Provider(provider);
      const Wsigner = web3Provider.getSigner();

      const accounts = Wsigner.getAddress();
      setAccount(localStorage.setItem("account", accounts));

    
      setMaskSigner(Wsigner);
      loadContract(Wsigner);
    } catch (error) {
      setShow(true);
      <ToastComp show={show} setShow={setShow} message={error} />;
    }
  };
  const uauth = new UAuth({
    clientID: "0bfe1e72-23d4-4a8c-80c6-c30dfe52d12b",
    redirectUri: "https://collection-kappa.vercel.app",
    scope: "openid email wallet ",
  });
 

  const unsLogin = async () => {
       setConnect(false);
     localStorage.removeItem("account")
       const authorization = await uauth.loginWithPopup();
      const accounts = await authorization.idToken.wallet_address;
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = await provider.getSigner();
      setMaskSigner(signer);
      setAccount(localStorage.setItem("account", accounts))     

      loadContract(signer);
   
  };

  const loadContract = (signer) => {
    const getCollectioncontract = new ethers.Contract(
      collectionaddress,
      collectionAbi.abi,
      signer
    );
    setCollection(getCollectioncontract);
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
        uauth={uauth}
      />
      <Routes>
        <Route
          path="/"
          element={<Home collection={collection} account={account} />}
        />
        <Route path="/create" element={<Create collection={collection} />} />
        <Route
          path="/collection/:address"
          element={
            <CollectionView
              collection={collection}
              account={account}
              metamaskSigner={metamaskSigner}
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
