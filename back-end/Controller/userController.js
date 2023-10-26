const { userModel } = require("../Model/userModel");

const Signup = async (req, res) => {
  const { name, userEmail, password } = req.body;
 
  console.log(userEmail)
  if (!name || !userEmail || !password) return res.json("Invalid details");

  try {
    const userInDb = await userModel.findOne({ userEmail: userEmail });
    if (userInDb!==null) return res.json("User Already exist");
  } catch (error) {
    return res.json({ message: "error" });
  }
  let cartProduct=[]
  
  let saveData = new userModel({name,userEmail,password,cartProduct});
  const result = await saveData.save();
  res.send(result);
};

const Login = async (req, res) => {
  const { userEmail, password } = req.body;

  
  if (!userEmail || !password) return res.json("Invalid details");
  try {
    const userInDb = await userModel.findOne({ userEmail: userEmail });
      console.log(userInDb)
    if (userInDb.password === password) {res.send(userInDb);}
  } catch (error) {
    return res.json({ message: "error" });
  }
};

const cartProductCheck=async(req,res)=>{
   const {userId}=req.params;
 
   try {
    let result= await userModel.findOne({_id: userId})
    res.send(result.data)

   } catch (error) {
    res.json({message:"error"})
   }

  
}





module.exports = { Signup,Login,cartProductCheck };
