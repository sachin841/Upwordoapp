const Usermodel = require("../../models/user.model");
const { generateAndSendOTP, GenerateOtp, sendmailregistraion } = require("../../Utility/notification");
const { gensalt, hashpassword, GeneratesSignature, Checkpassword } = require("../../Utility/password-hash");
const { registrationSchema, loginSchema, otpSchema } = require("../../Utility/Schema");


exports.UserSignup = async (req, res) => {


  const { error } = registrationSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  const { email } = req.body
  if (email) {
    try {
      let existingUser = await Usermodel.findOne({ email: email });

      if (existingUser) {
        return res.status(400).json({ "message": "User is already registered" });
      }
      const { otp, expiry } = GenerateOtp()


      let result = await Usermodel.create({
        name: '',
        email: email,
        otp: otp,
        otp_expire: expiry,
        verified: false


      })
      if (result) {
        sendmailregistraion(email, otp)

        let signature = await GeneratesSignature({
          _id: result?._id,
          email: result?.email
        })


        return res.status(201).json({ signature, verified: result.verified, email: result.email })


      }


    }



    catch (err) {
      return res.status(500).json({ "message": "An error occurred while checking the database" });
    }
  }

}


exports.Userlogin = async (req, res) => {
  const { email, password } = req.body
  const { error } = loginSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  if (email) {
    try {
      let existingUser = await Usermodel.findOne({ email: email });
      console.log(existingUser, "this is existing user");
      if (existingUser) {

        console.log(existingUser, "this is existing2 user");

        let validate = await Checkpassword(existingUser.password, existingUser?.salt, password);
        console.log(validate, "this is validate");
        if (validate) {
          let signature = await GeneratesSignature({
            _id: existingUser?._id,
            email: existingUser?.email
          })
          return res.status(200).json({
            token: signature
          })
        }


      }

      return res.json({
        "Message": "Invalid Credential"
      })

    } catch (err) {
      return res.status(500).json({ "message": "An error occurred while checking the database" });
    }
  }
}


exports.verifyuser = async (req, res) => {
  let user = req.user
  console.log(user);
  const { error } = otpSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  let { otp } = req.body
  console.log(otp);

  if (user) {
    const exituser = await Usermodel.findById(user?._id)
    if (exituser && exituser?.otp === otp && exituser.otp_expire >= new Date()) {
      exituser.verified = true
      let updateuser = await exituser.save()

      let sign = await GeneratesSignature({
        _id: exituser?._id,
        email: exituser?.email
      });

      return res.json({
        token: sign, _id: updateuser?._id, verified: updateuser?.verified, email: updateuser?.email
      })

    }
  }


}

exports.Resendotpuser = async (req, res) => {
  try {
    const user = req.user;
    console.log(user, "cheking");
    const { otp, expiry } = GenerateOtp();

    // Use `await` with `findById` to ensure the user is retrieved before proceeding
    const singleuser = await Usermodel.findById(user._id);

    if (singleuser) {
      singleuser.otp = otp;
      singleuser.otp_expire = expiry;

      // Save the changes to the user document using `.save()`
      await singleuser.save();

      // Assuming `sendmailregistraion` is an async function, await it as well
      sendmailregistraion(singleuser.email, otp);

      return res.status(200).json({
        message: "Your OTP will be sent",
      });
    } else {
      return res.status(404).json({
        message: "User not found",
      });
    }
  } catch (error) {
    console.error("Error in Resendotpuser:", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};


exports.Alluser = async (req, res) => {
  const alluser = await Usermodel.find({})
  if (alluser) {
    return res.json(alluser)
  }
  return res.json({
    "Message": 'There are not User'
  })

}



exports.Updateuser = async (req, res) => {
  let user = req.user
  console.log(user, "cheking user");


  const updates = req.body; // Assuming the updates are sent in the request body as JSON

  // Find the user by ID and update their information
  const updatedUser = await Usermodel.findByIdAndUpdate(user._id, updates, {
    new: true, // Return the updated document
  });

  if (updatedUser) {
    return res.json(updatedUser);
  } else {
    return res.status(404).json({
      message: 'User not found',
    });
  }
}



exports.Deleteuser = async (req, res) => {
  try {
    const userId = req.user._id

    // Use Mongoose to find and delete the user by ID
    const deletedUser = await Usermodel.findByIdAndRemove(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}