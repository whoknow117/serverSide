const {DeviceInfo} = require('../models/models')
const ApiError = require('../error/ApiError')
const {DeviceInfoDescription} = require("../models/models");

class InfoController {


    async create (req, res,next) {
         try {
             let {title,typeId } = req.body
             const info = await DeviceInfo.create({title,typeId})
             return res.json(info)
         }
         catch (e) {
             return ApiError.badRequest(e.message)
         }
    }

    // async getAll(req,res) {
    //     let {typeId} = req.query
    //     let info;
    //
    // }

    async getAllTypeId(req, res) {
        let {typeId} = req.query
        let info;
        if (!typeId) {
            info = await DeviceInfo.findAll()

        }
        if (typeId) {
            info = await DeviceInfo.findAll(
                {where: {typeId},


            })



        }
        return res.json(info)
    }


}


module.exports = new InfoController()