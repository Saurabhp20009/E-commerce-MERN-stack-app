import { Box } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import CartProductDisplay from "./CartProductDisplay";
import CartProductPriceBox from "./CartProductPriceBox";
import axios from "axios";
import NoProductInCart from "./NoProductInCart";

const CartPage = () => {
  const [productInCart, setProductInCart] = useState([]);
  let user = localStorage.getItem("user");
  user=JSON.parse(user)
 
  useEffect(
    () =>
      async function cartProductCheck() {
        let result = await axios.get(
          `http://localhost:5000/product/api/getUserCartPro/${user._id}`
        );

        setProductInCart(result.data);
        //console.log(result.data)
      },
    []
  );
 
  return (
    <Box border={"1px solid"} padding={"1% 3% 0 3%"}>
      {productInCart.length ? (
        <Box
          borderWidth={"1px"}
          display={"flex"}
          justifyContent={"space-evenly"}
          variant="outline"
          padding={"1%"}
          margin={"0.5%"}
        >
          <CartProductDisplay productInCart={productInCart}  />
          <CartProductPriceBox />
        </Box>
      ) : (
        <NoProductInCart />
      )}
    </Box>
  );
};

export default CartPage;
