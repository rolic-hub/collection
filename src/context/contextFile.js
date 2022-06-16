import { createContext, useContext, useState } from "react";
import { ethers } from "ethers";
import WalletConnectProvider from "@walletconnect/web3-provider";
import UAuth from "@uauth/js";
 const Context = createContext();
export function ContextFile({children}) {

     const [account, setAccount] = useState();

     const { ethereum } = window;
     const web3handler = async () => {
       const accounts = await ethereum.request({
         method: "eth_requestAccounts",
       });
       setAccount(accounts[0]);
       const provider = new ethers.providers.Web3Provider(ethereum);
       const signer = provider.getSigner();
       // loadContract(signer);
     };

     const walletC = async () => {
       const provider = new WalletConnectProvider({
         infuraId: "27e484dcd9e3efcfd25a83a78777cdf1",
       });
       //  Enable session (triggers QR Code modal)
       await provider.enable();
       await provider.request({ payload: "eth_requestAccounts" });

       const web3Provider = new ethers.providers.Web3Provider(provider);
       const signer = web3Provider.getSigner();
       const accounts = signer.getAddress();
       setAccount(accounts);
       // loadContract(signer);
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
       } catch (error) {
         console.log(error);
       }
     };
   
    return (
        <Context.Provider value={account}>
            {children}
        </Context.Provider>

    )
}

export const useContextFile = () => useContext(Context);