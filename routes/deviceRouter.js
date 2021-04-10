const Router = require('express')
const deviceController = require('../controllers/deviceController')
const router = new Router()


router.post('/',deviceController.create)
router.patch('/',deviceController.updateOne)
router.put('/',deviceController.updateAll)
router.get('/',deviceController.getAll)
router.get('/:id',deviceController.getOne)
router.delete('/',deviceController.deleteOne)





module.exports = router