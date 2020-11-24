const router = require('express').Router()
const auth = require('../middleware/auth')
const groupCtrl = require('../controllers/groupCtrl')
router.route('/')
    .get(auth, groupCtrl.getGroup)
    .post(auth, groupCtrl.createGroup)

router.route('/:id')
    .get(auth,groupCtrl.getGroupbyid)
    .put(auth,groupCtrl.updateGroup)
    .delete(auth,groupCtrl.deleteGroup)

module.exports = router