const {Available} = require('../models/models')
const ApiError = require('../error/ApiError')


class AvailableController {
    async create( req, res) {
        const {name} = req.body
        const available = await Available.create({name})
        return res.json(available)

    }
    async getAll( req, res) {
        const availables = await Available.findAll()
        return res.json(availables)
    }

}


module.exports = new AvailableController()