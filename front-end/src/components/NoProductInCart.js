import { Box,Heading } from '@chakra-ui/react'
import React from 'react'

const NoProductInCart = () => {
  return (
   <Box  borderWidth={"1px"}
   display={"flex"}
   justifyContent={"space-evenly"}
   variant="outline"
   padding={"1%"}
   margin={"0.5%"}>
  
   <Box margin={"20%"}>
   <Heading as='h1' size='2xl' noOfLines={1}>
   Please add product in cart!
  </Heading>

   </Box>


   </Box>
  )
}

export default NoProductInCart