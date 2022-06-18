import { createContext, useContext, useState } from "react";



const Context = createContext();



export function ContextFile({ children }) {
  
 
  return (
    <Context.Provider
      value={{
        // account,
        // marketplace,
        // collection,
        // web3handler,
        // walletC,
        // unsLogin,
        
      }}
    >
      {children}
    </Context.Provider>
  );
}

export const useContextFile = () => useContext(Context);
