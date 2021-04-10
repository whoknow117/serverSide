const Router = require('express')
const availableController = require('../controllers/availableController')
const router = new Router()


router.post('/',availableController.create)
router.get('/',availableController.getAll)



module.exports = router