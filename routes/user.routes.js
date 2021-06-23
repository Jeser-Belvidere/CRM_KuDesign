const Router = require('express')
const userController = require('../controllers/user.controller')
const router = new Router()




router.post('/user', userController.createUser)
router.get('/user', userController.getUser)
router.put('/user', userController.updateUser)
router.delete('/user', userController.deleteUser)


module.exports = router