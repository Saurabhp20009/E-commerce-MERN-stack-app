import { Box} from '@chakra-ui/react'
import React, { useState } from 'react'
import SignUp from './SignUp'
import Login from './Login'

const Auth = () => {
  const [login,setLogin]=useState(false)
 
  const handleChange=()=>{
  setLogin(!login)
  }

  return (
   <Box>
   <Box>
    {!login ? <SignUp handleChange={handleChange} /> : <Login handleChange={handleChange}></Login>}
   </Box>
   </Box>
  )
}

export default Auth