const express = require('express')
const { Authenticateuser } = require('../../middlewares/auth.middleware')
const { UserSignup, Userlogin, Alluser, Updateuser, Deleteuser, verifyuser, Resendotpuser } = require('./user.controller')


const router = express.Router()


router.post('/signup', UserSignup
)

router.post('/login', Userlogin)
router.use(Authenticateuser)
router.patch('/verify', verifyuser)
router.get('/resendotp', Resendotpuser)


router.patch('/update_user', Updateuser)



router.get('/user', Alluser)


router.delete('/user', Deleteuser)


module.exports = router



