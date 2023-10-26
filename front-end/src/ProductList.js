import React, { createContext, useState } from "react";

const PriceContext = createContext("");
var ProductList = ({children}) => {
  const [change, setChange] = useState(false)


    
  return <PriceContext.Provider value={[change, setChange]}>
    {children}
  </PriceContext.Provider>;
};

export  {ProductList, PriceContext}
