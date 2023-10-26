import {
  Box,
  Button,
  Heading,
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

const CartProductPriceBox = () => {
  let user = localStorage.getItem("user");
  user = JSON.parse(user);

  const [totalPrice, setTotalPrice] = useState(0);
  const [change, setChange] = useContext(PriceContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();

  useEffect(
    () =>
      async function () {
        let result1 = await axios.get(
          `http://localhost:5000/product/api/getUserCartPro/${user._id}`
        );
        let tempPrice = 0;

        console.log(result1.data);

        let result2 = await axios.get(
          "http://localhost:5000/product/api/getProduct"
        );
        console.log(result2.data);

        result2.data.forEach((element) => {
          result1.data.forEach((item) => {
            if (element._id === item.productId) {
              tempPrice += parseInt(element.price) * parseInt(item.quantity);
            }
          });
        });
        setTotalPrice(tempPrice);
      },
    [change]
  );

  console.log(totalPrice);


  const handlePlaceOrder=()=>{
     
    onClose()
  }


  return (
    <Box padding={"1%"} margin={"1%"} width={"60%"}>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
             Place Order
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure to place the Order ?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button bg={"#fb641b"} onClick={()=>handlePlaceOrder()} ml={3}>
                Place Order
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      <Box border={"3px solid "} padding={"3%"}>
        <Heading as="h3" size="lg">
          Price details
        </Heading>

        <Box display={"flex"} justifyContent={"space-between"} margin={"3%"}>
          <Heading as="h5" size="md" fontWeight={"normal"}>
            Price
          </Heading>
          <Heading as="h5" size="md" fontWeight={"bold"}>
            ₹{totalPrice}
          </Heading>
        </Box>

        <Box display={"flex"} justifyContent={"space-between"} margin={"3%"}>
          <Heading as="h5" size="md" fontWeight={"normal"}>
            Discount
          </Heading>
          <Heading as="h5" size="md" fontWeight={"bold"} color={"green"}>
            - ₹100
          </Heading>
        </Box>

        <Box display={"flex"} justifyContent={"space-between"} margin={"3%"}>
          <Heading as="h5" size="md" fontWeight={"normal"}>
            Delivery Charges
          </Heading>
          <Heading as="h5" size="md" fontWeight={"bold"} color={"red"}>
            ₹40
          </Heading>
        </Box>

        <Box display={"flex"} justifyContent={"space-between"} margin={"3%"}>
          <Heading as="h5" size="md" fontWeight={"normal"}>
            Secured Packaging Fee
          </Heading>
          <Heading as="h5" size="md" fontWeight={"bold"} color={"red"}>
            ₹98
          </Heading>
        </Box>

        <Box display={"flex"} justifyContent={"space-between"} margin={"6%"}>
          <Heading as="h5" size="lg" fontWeight={"normal"}>
            Total Price
          </Heading>
          <Heading as="h5" size="lg" fontWeight={"bold"}>
            ₹{totalPrice + parseInt(38)}
          </Heading>
        </Box>

        <Box margin={"6%"} textAlign={"right"}>
          <Button width={"60%"} bg={"#fb641b"} color={"black"} onClick={onOpen}>
            Place Order
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default CartProductPriceBox;
