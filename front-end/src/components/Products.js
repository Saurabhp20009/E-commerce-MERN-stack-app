import { Box } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import ProductCart from "./ProductCart";
import axios from "axios";

export const Products = () => {
  const [productList, setProductList] = useState([]);

  useEffect(
    () =>
      async function getAllProduct() {
        let result = await axios.get(
          "http://localhost:5000/product/api/getProduct"
        );
        setProductList(result.data);
      },
    []
  );

  return (
    <Box padding={"1% 3% 0 3%"}>
      <Box>
        {console.log(productList)}
        {productList.map((item, index) => (
          <ProductCart
            key={index}
            imageDir={item.imageDir}
            name={item.name}
            description={item.description}
            rating={item.rating}
            price={item.price}
            productId={item._id}
          />
        ))}
      </Box>
    </Box>
  );
};
