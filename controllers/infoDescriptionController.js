const {DeviceInfoDescription} = require('../models/models')
const ApiError = require('../error/ApiError')

class InfoDescriptionController {
    async deleteOne (req,res) {

        let {id} = req.query

        let infoDescription = await DeviceInfoDescription.destroy({where: {
            deviceId: id
            }})
        return res.json(infoDescription)
    }


    async getAll (req, res, next) {
        try {
            let {typeId,deviceId, deviceInfoId} = req.query
            let infoDescription;
            if(!typeId && !deviceId && !deviceInfoId) {
                infoDescription = await DeviceInfoDescription.findAll()
            }
            if( typeId && !deviceId && !deviceInfoId) {
                infoDescription = await DeviceInfoDescription.findAll({where:{typeId}})
            }
            if(!typeId &&  deviceId && !deviceInfoId) {
                infoDescription = await DeviceInfoDescription.findAll({where:{deviceId}})
            }
            if(!typeId &&  !deviceId &&  deviceInfoId) {
                infoDescription = await DeviceInfoDescription.findAll({where:{deviceInfoId}})
            }
            if(!typeId &&  deviceId && deviceInfoId) {
                infoDescription = await DeviceInfoDescription.findAll({where:{deviceId,deviceInfoId}})
            }
            if( typeId &&  deviceId && deviceInfoId) {
                infoDescription = await DeviceInfoDescription.findAll({where:{typeId,deviceId,deviceInfoId}})
            }
            if( typeId &&  deviceId && !deviceInfoId) {
                infoDescription = await DeviceInfoDescription.findAll({where:{typeId,deviceId}})
            }
            if( typeId &&  !deviceId &&  deviceInfoId) {
                infoDescription = await DeviceInfoDescription.findAll({where:{typeId,deviceInfoId}})
            }
            return res.json(infoDescription)
        }
        catch (e){
           return ApiError.badRequest(e.message)
        }
    }
}

module.exports = new InfoDescriptionController()