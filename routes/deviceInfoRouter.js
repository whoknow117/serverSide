const Router = require('express')
const infoController = require('../controllers/infoController')
const router = new Router()



router.post('/',infoController.create)
router.get('/',infoController.getAllTypeId)



module.exports = router