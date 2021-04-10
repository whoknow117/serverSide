const Router = require('express')
const unitController = require('../controllers/unitController')
const router = new Router()


router.post('/',unitController.create)
router.get('/',unitController.getAll)



module.exports = router