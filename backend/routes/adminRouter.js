const router = require('express').Router();
const adminCtrl = require('../controllers/adminCtrl')
const auth = require('../middleware/auth')
//register admin
router.post('/register',adminCtrl.registerAdmin)

//login admin
router.post('/login',adminCtrl.loginAdmin)

//verify Token
router.get('/verify', adminCtrl.verifiedToken)
module.exports=router