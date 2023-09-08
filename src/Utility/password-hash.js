const bcrypt = require('bcrypt');
const { Secret_key } = require('../Config/mongodb');
const Jwt = require('jsonwebtoken');


const gensalt = async () => {
   return await bcrypt.genSalt(5)
}


const hashpassword = async (password, saltk) => {
   return await bcrypt.hash(password, saltk)

}
const Checkpassword = async (password, salt, Userpassword) => {
   return await hashpassword(Userpassword, salt) === password
}
const GeneratesSignature = (payload) => {

   return Jwt.sign(payload, Secret_key, { expiresIn: "1d" })
}




const ValidateSignature = async (req) => {


   const signature = req.get("Authorization")



   if (signature) {
      try {
         const paylaod = await Jwt.verify(signature.split(' ')[1], Secret_key)

         req.user = paylaod
         return true;


      } catch (err) {
         return false
      }
   }


   return false;
}
module.exports = {
   gensalt, hashpassword, Checkpassword, GeneratesSignature, ValidateSignature
}