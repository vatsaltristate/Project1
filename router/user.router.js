const router = require("express").Router()

const { signupUser, loginUser, findOneUser, updateUser, deleteUser, findAllUser } = require('../controller/user.controller')
const { checkEmailPassword, tokenVerification } = require('../middleware/auth/verify.middleware')
const { doesAlreadyExist, addUserValidation} = require('../middleware/validation/user.validation')


router.post('/signup', doesAlreadyExist, addUserValidation, signupUser)
router.post('/login', checkEmailPassword, loginUser)
router.get('/all', tokenVerification, findAllUser)
router.get('/all/:id', tokenVerification, findOneUser)
router.put('/update/:id', doesAlreadyExist, addUserValidation, tokenVerification, updateUser)
router.delete('/delete/:id', tokenVerification, deleteUser)


module.exports = router;
