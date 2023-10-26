import { Box } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import CartProduct from "./CartProduct";

const CartProductDisplay = ({ productInCart }) => {
  const [productDetails, setProductDetails] = useState([]);
  let tempArr=[]
  useEffect(
    () =>
      async function getCartProductDetails() {
        let result = await axios.get(
          "http://localhost:5000/product/api/getProduct"
        );
        console.log(result.data);

        productInCart.forEach((item) => {
          result.data.forEach((element) => {
            if (item.productId === element._id) {
                tempArr.push(element)
                setProductDetails(tempArr)
            }
          });
        });
      },
    []
  );

  // const getCartProductDetails = async () => {

  //console.log("pro", productInCart);
  // };

  return <Box>
    <Box > 
     {
      productDetails.map((item,index)=>{
        return <CartProduct key={index}   imageDir={item.imageDir}
        name={item.name}  price={item.price} productId={item._id} productInCart={productInCart}/>
      })
     }
     
    </Box>
    </Box>;
};

export default CartProductDisplay;
