const {Unit} = require('../models/models')
const ApiError = require('../error/ApiError')

class UnitController {
     async create (req,res){
         let {name} = req.body

         const unit = await Unit.create({name})

         return res.json(unit)
     }
     async getAll (req,res){


         const units = await Unit.findAll()

         return res.json(units)

     }

}


module.exports = new UnitController()