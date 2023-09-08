const { ValidateSignature } = require("../Utility/password-hash");


exports.Authenticateuser = async (req, res, next) => {
    let validate = await ValidateSignature(req)
    console.log(validate);

    if (validate) {
        return next()
    } else {
        return res.json({
            "Message": "User are not authen ticate"
        })
    }

}
