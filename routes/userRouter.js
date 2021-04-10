const Router = require('express')
const userController = require('../controllers/userController')
const router = new Router()
const authMiddleware = require('../middlewares/AutMiddleware')


router.post('/registration',userController.registration)
router.post('/login',userController.login)
router.get('/auth',authMiddleware, userController.check)



module.exports = router