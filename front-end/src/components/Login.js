import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = (handleChange) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate=useNavigate()

  const toast = useToast();

  const handleSubmit = async() => {
    console.log(email, password);
    if (!email || !password) {
      return toast({
        title: "Invalid credentials",
        description: "Please check the fields",
        status: "error",
        duration: 1000,
        isClosable: true,
      });
    }
   let userEmail=email;
    let result= await axios.post("http://localhost:5000/user/api/login",{userEmail,password})
     if(!result.data._id)
     {
      return toast({
        title: "Invalid credentials",
        description: "user doesn't exist",
        status: "error",
        duration: 1000,
        isClosable: true,
      });
     } 
    
     toast({
      title: "Login Successful",
      description: "Success",
      status: "success",
      duration: 1000,
      isClosable: true,
    });
  
    localStorage.setItem("user",JSON.stringify(result.data))
    navigate("/home")

  };

  return (
    <Box>
      <Box
        padding={"3%"}
        display={"flex"}
        justifyContent={"center"}
        margin={"auto"}
      >
        <Box
          border={"4px solid black"}
          textAlign={"center"}
          padding={"2%"}
          width={"40%"}
        >
          <FormControl display={"flex"} flexDirection={"column"}>
            <Heading size={"md"}>Login</Heading>
            {/* <Box margin={"1%"}>
                <FormLabel fontWeight={"600"}>Name</FormLabel>
                <Input
                  type="text"
                  border={"2.5px solid black"}
                  borderRadius={"2px"}
                  fontSize={"14px"}
                  placeholder="Enter the name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Box> */}
            <Box margin={"1%"}>
              <FormLabel fontWeight={"600"}>Email</FormLabel>
              <Input
                type="email"
                border={"2.5px solid black"}
                borderRadius={"2px"}
                placeholder="Enter the email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Box>
            <Box margin={"1%"}>
              <FormLabel fontWeight={"600"}>Password</FormLabel>
              <Input
                type="text"
                border={"2.5px solid black"}
                borderRadius={"2px"}
                placeholder="Enter the password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Box>
            {/* <Box margin={"1%"}>
                <FormLabel fontWeight={"600"}>Confirm Password</FormLabel>
                <InputGroup>
                  {" "}
                  <Input
                    type={!show ? "password" : "text"}
                    border={"2.5px solid black"}
                    borderRadius={"2px"}
                    placeholder="Enter the confirm password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <InputRightElement width="4.5rem">
                    <Button
                      size={"sm"}
                      h="1.75rem"
                      border={"2px solid black"}
                      borderRadius={"2px"}
                      onClick={handleClick}
                    >
                      {!show ? "Show" : "Hide"}{" "}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </Box> */}

            <Box margin={"2.5%"}>
              <Button
                border={"2.5px solid black"}
                borderRadius={"2px"}
                onClick={handleSubmit}
              >
                Login
              </Button>
            </Box>
            <Box textAlign={"right"} color={"blue"} onClick={handleChange}>
              <Link>Change to SignUp</Link>
            </Box>
          </FormControl>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
