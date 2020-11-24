const router = require('express').Router()
const auth = require('../middleware/auth')
const userCtrl = require('../controllers/userCtrl')

router.route('/')
    .get(auth,userCtrl.getUser)
    .post(auth, userCtrl.createUser)

router.route('/:id')
    .get(auth, userCtrl.getUserbyid)
    .put(auth,userCtrl.updateUser)
    .delete(auth,userCtrl.deleteUser)

module.exports = router