const {Basket,BasketDevice} = require('../models/models')
const ApiError = require('../error/ApiError')



class BasketController {
    async create( req, res,next) {

        try {
            let {phone, items,strCounts} = req.body

            let basket = await Basket.create({phone})
            if (items && strCounts) {

                items = JSON.parse(items)
                strCounts = JSON.parse(strCounts)

                items.forEach( (i,idx) => {
                    BasketDevice.create({
                        basketId: basket.id,
                        deviceId: i.id,
                        count: strCounts[idx][i.id] == null ? 1 : strCounts[idx][i.id]
                    })
                })
            }
            res.json(basket)
        }
        catch (e) {
            ApiError.badRequest(e.message)
        }


    }
    async getAll( req, res) {
        const basket = await Basket.findAll()
        return res.json(basket)
    }

}


module.exports = new BasketController()