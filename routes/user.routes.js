const Router = require('express')
const userController = require('../controllers/user.controller')
const router = new Router()
const {check} = require('express-validator')

router.post('/', [
    check('email', 'Email cannot be empty').notEmpty(),
    check('password', 'Password cannot be less then 5 symbols').isLength({min:5}),
    check('mobile_phone', 'Mobile phone cannot be empty').notEmpty()
], userController.createUser)
router.get('/', [
    check('email', 'Email cannot be empty').notEmpty()
],userController.getUser)
router.get('/login', userController.loginUser)
router.put('/',[
    check('email', 'Email cannot be empty').notEmpty(),
    check('password', 'Password cannot be less then 5 symbols').isLength({min:5}),
], userController.updateUser)
router.delete('/',[
    check('email', 'Email cannot be empty').notEmpty(),
], userController.deleteUser)
router.get('/users',[
    check('email', 'Email cannot be empty').notEmpty(),
], userController.listOfUsers)

module.exports = router