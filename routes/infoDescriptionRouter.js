const Router = require('express')
const  infoDescriptionController = require('../controllers/infoDescriptionController')
const router = new Router()

router.get('/', infoDescriptionController.getAll)
router.delete('/', infoDescriptionController.deleteOne)


module.exports = router