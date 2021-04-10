const Router = require('express')
const router = new Router()
const deviceRouter = require('./deviceRouter')
const userRouter = require('./userRouter')
const typeRouter = require('./typeRouter')
const brandRouter = require('./brandRouter')
const categoryRouter = require('./categoryRouter')
const infoRouter = require('./deviceInfoRouter')
const infoDescriptionRouter = require('./infoDescriptionRouter')
const unitRouter = require('./unitRouter')
const availableRouter = require('./availableRouter')
const basketRouter = require('./basketRouter')


router.use('/user',userRouter)
router.use('/device',deviceRouter)
router.use('/type',typeRouter)
router.use('/brand',brandRouter)
router.use('/info',infoRouter)
router.use('/available',availableRouter)
router.use('/infoDescription', infoDescriptionRouter)
router.use('/category',categoryRouter)
router.use('/unit',unitRouter)
router.use('/basket',basketRouter)




module.exports = router