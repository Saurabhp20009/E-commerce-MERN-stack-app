import {
  Box,
  Card,
  Image,
  Stack,
  CardBody,
  Heading,
  Text,
  CardFooter,
  Button,
  useDisclosure,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { PriceContext } from "../ProductList";

const CartProduct = ({ imageDir, name, price, productId, productInCart }) => {
  const [cartPrice, setCartPrice] = useState("");
  const [cartQuantity, setCartQuantity] = useState("");
  const [cartProductId, setCartProductId] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();

  const [change,setChange]= useContext(PriceContext)

  let user = localStorage.getItem("user");
  user = JSON.parse(user);

  useEffect(() => defaultQuantity(), []);

  const defaultQuantity = () => {
    productInCart.forEach((element) => {
      if (element.productId === productId) {
        setCartProductId(element._id);
        setCartQuantity(element.quantity);
    

       return setCartPrice(parseInt(element.quantity) * parseInt(price));

      }
    });
  };

  const handleQuantity = async (value) => {
    let result = await axios.post(
      "http://localhost:5000/product/api/updateCart",
      { cartProductId, value }
    );

    {
      let findCartProduct = await axios.get(
        ` http://localhost:5000/product/api/getSpecificCartPro/${cartProductId}`
      );
      console.log(findCartProduct);
      setCartQuantity(findCartProduct.data[0].quantity);
       setCartPrice(
        parseInt(findCartProduct.data[0].quantity) * parseInt(price)
      );
      return setChange(!change)
    }
  };

  const handleRemove = async () => {
    let result = await axios.delete(
      `http://localhost:5000/product/api/deleteCart/${cartProductId}`
    );
    console.log(result);
    onClose();
    window.location.reload(false)

  };
  
  

  return (
    <Box padding={"1%"} margin={"1%"} width={"80%"}>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Remove Product
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure to remove product from cart?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={()=>handleRemove()} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      <Card
        direction={{ base: "column", sm: "row" }}
        overflow="hidden"
        variant="outline"
        padding={"1%"}
      >
        <Image
          objectFit="contain"
          maxW={{ base: "100%", sm: "200px" }}
          src={imageDir}
          border={"3px solid "}
          padding={"1%"}
        />

        <Stack>
          <CardBody>
            <Heading size="md">{name}</Heading>

            <Text py="2">
              Quantity
              <Box margin={"1% 0"}>
                <Button onClick={() => handleQuantity(false)} margin={"1%"}>
                  -
                </Button>
                {cartQuantity}
                <Button onClick={() => handleQuantity(true)} margin={"1%"}>
                  +
                </Button>
              </Box>
            </Text>
          </CardBody>

          <CardFooter display={"flex"} justifyContent={"space-evenly"}>
            <Text>Total price ₹{cartPrice}</Text>
            <Button variant="solid" colorScheme="red" onClick={onOpen}>
              Remove
            </Button>
          </CardFooter>
        </Stack>
      </Card>
    </Box>
  );
};

export default CartProduct;
