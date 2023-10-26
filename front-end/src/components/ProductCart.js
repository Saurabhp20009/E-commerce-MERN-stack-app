import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardFooter,
  Stack,
  Heading,
  Text,
  Button,
  Image,
  Box,
  useToast,
  HStack,
  TagLabel,
  TagCloseButton,
  Tag,
} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";

import { useNavigate } from "react-router-dom";
import axios from "axios";
const ProductCart = ({
  imageDir,
  name,
  description,
  price,
  rating,
  productId,
}) => {
  let user = localStorage.getItem("user");
  const [cartButton, setCartButton] = useState(false);
  user = JSON.parse(user);
  const toast = useToast();
  let navigate = useNavigate();

  useEffect(() => {
    cartProductCheck();
  }, []);

  //console.log(productList)

  const cartProductCheck = async () => {
    let result = await axios.get(
      `http://localhost:5000/product/api/getUserCartPro/${user._id}`
    );

    result.data.forEach((item) => {
      if (item.productId === productId) {
        console.log(true)
        return setCartButton(true);
      }
    });
  };

  const handleBuyNow = async () => {
    if (!user) navigate("/auth");
    else {
      let result = await axios.post(
        `http://localhost:5000/product/api/addCart/${user._id}`,
        { productId: productId }
      );

      console.log(result.data);
      if (result.data.acknowledged) {
        toast({
          title: "Product add to you cart successfully",
          description: "Success",
          status: "success",
          duration: 1000,
          isClosable: true,
        });
        setCartButton(true);
      } else {
        return toast({
          title: "Unknown error ocuured",
          description: "error",
          status: "error",
          duration: 1000,
          isClosable: true,
        });
      }
    }
  };

  const handleGoToCart = () => {};

  return (
    <Card
      direction={{ base: "column", sm: "row" }}
      overflow="hidden"
      variant="outline"
      padding={"1%"}
      margin={"0.5%"}
    >
      <Image
        objectFit="contain"
        maxW={{ base: "100%", sm: "200px" }}
        src={imageDir}
        alt="Caffe Latte"
        border={"3px solid "}
        padding={"1%"}
      />

      <Stack>
        <CardBody>
          <Heading size="md">{name}</Heading>

          <Box margin={"1.5%"}>
            <Text fontSize={"2xl"} color={"#3182ce"}>
            ₹{price}
            </Text>
            <Text py="2">{description}</Text>
          </Box>

          <Box>
            <HStack spacing={4}>
              <Tag
                size={"lg"}
                borderRadius="full"
                variant="solid"
                colorScheme="green"
              >
                <TagLabel>{rating}</TagLabel>
                <StarIcon />
              </Tag>
            </HStack>
          </Box>
        </CardBody>

        <CardFooter>
          {!cartButton ? (
            <Button variant="solid" colorScheme="blue" onClick={handleBuyNow}>
              Buy Now
            </Button>
          ) : (
            <Button variant="solid" colorScheme="red" onClick={handleGoToCart}>
              Go to Cart
            </Button>
          )}
        </CardFooter>
      </Stack>
    </Card>
  );
};

export default ProductCart;
