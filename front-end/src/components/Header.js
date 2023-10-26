import React from 'react'
import { Box } from "@chakra-ui/react";
import { Link, Outlet, useNavigate } from 'react-router-dom';
const Header = () => {
  let user= localStorage.getItem("user")
  let navigate= useNavigate()

  const handleLogout=()=>{
    localStorage.clear("users")
    navigate("/auth")
  }

  return (
    <Box  >
    <Box borderWidth={"1px"} padding={"1%"} color={"white"} backgroundColor={"black"}>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        listStyleType={"none"}
      >
        <Box>
         <Link to={"/home"}>Home</Link> 
        </Box>
        <Box
          listStyleType={"none"}
          display={"flex"}
          width={"30%"}
          justifyContent={"space-evenly"}
        >
          <Link to={"/cartPage"}>Cart</Link>
          {!user ?<Link to={"/auth"}>Auth</Link>
          :<li onClick={handleLogout}>Logout</li>}
             
        </Box>
      </Box>
    </Box>
    <Outlet/>
  </Box>
  )
}

export default Header