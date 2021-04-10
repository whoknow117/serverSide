const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const {Device, DeviceInfo, DeviceInfoDescription} = require('../models/models')
const ApiError = require('../error/ApiError')
const uuid = require('uuid')
const path = require('path')


class DeviceController {
    async create(req, res, next) {
        try {
            let {
                name,
                price,
                aliasName,
                brandId,
                quantity,
                availableId,
                article,
                typeId,
                unitId,
                categoryId,
                infoDescription,
                info
            } = req.body
            const {img} = req.files
            let promises = []
            let fileName = '';
            console.log(img)
            let newArray = []
            img.forEach(file => {
                fileName = uuid.v4() + '.jpg'
                promises.push(file.mv(path.resolve(__dirname, '..', 'static', fileName)))
                newArray.push(fileName)
            })
            await Promise.all(promises)
            console.log(newArray)
            const device = await Device.create({
                name,
                price,
                aliasName,
                article,
                availableId,
                quantity,
                brandId,
                typeId,
                unitId,
                categoryId,
                img: JSON.stringify(newArray),
                infoDescription,
                info


            })
            if (infoDescription) {

                info = JSON.parse(info)
                infoDescription = JSON.parse(infoDescription)

                infoDescription.forEach((i, idx1) =>
                    DeviceInfoDescription.create({
                        key: {idx1},
                        title: i.title,
                        deviceId: device.id,
                        typeId: typeId,
                        deviceInfoId: (info[idx1].id)

                    })
                )
            }


            return res.json(device)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async updateOne(req, res, next) {
        try {
            let {id,price,quantity, availableId} = req.body


            let updatedProduct = await Device.update({price, quantity, availableId}, {
                  where: {id},




            });


            return res.json(updatedProduct)

        } catch (e) {
            ApiError.badRequest(e.message)
        }
    }
    async updateAll(req, res, next) {
        try {
            let {device} = req.body
            console.log(device)
            if(device) {

                device = JSON.parse(device)

                device.forEach( el => {
                    Device.update({
                        price: el.price,
                        quantity: el.quantity
                    },{
                        where: {
                            article: {
                                [Op.or]: el.article
                            }
                        }
                    })
                })

            }

        }
        catch (e) {
            ApiError.badRequest(e.message)
        }

    }


    async getAll(req, res, next) {

        try {
            let {brandId, typeId, categoryId, honey, name, limit, page} = req.query

            let offset = page * limit - limit
            let devices;


            if (honey) {
                honey = JSON.parse(honey)
            }

            if (!name && !categoryId && !brandId && !typeId && !honey) {
                devices = await Device.findAndCountAll(
                    {limit, offset})
            }

            if (name && !brandId && !typeId && !honey) {


                devices = await Device.findAndCountAll({
                    where: {
                        aliasName: {[Op.like]: "%" + name + "%"}
                    }, limit, offset
                })
            }
            if (!categoryId && !brandId && typeId && honey) {
                devices = await Device.findAndCountAll({
                        where: {
                            typeId,
                            id: {
                                [Op.or]: honey
                            },

                        },

                        limit, offset
                    }
                )

            }

            if (brandId && !typeId && !categoryId && !honey) {
                devices = await Device.findAndCountAll({
                    where: {brandId},

                    limit, offset
                })

            }
            if (!brandId && typeId && !categoryId && !honey) {
                devices = await Device.findAndCountAll({
                    where: {typeId},
                    // include:[{model: DeviceInfoDescription,raw: true}],
                    limit, offset
                })
            }
            if (brandId && typeId && !categoryId && !honey) {
                devices = await Device.findAndCountAll({
                    where: {brandId, typeId},
                    // include:[{model: DeviceInfoDescription,raw: true}],
                    limit, offset
                })
            }
            if (!brandId && !typeId && categoryId && !honey) {
                devices = await Device.findAndCountAll({
                    where: {categoryId},

                    limit, offset
                })
            }
            if (!brandId && typeId && categoryId && !honey) {
                devices = await Device.findAndCountAll({
                    where: {typeId, categoryId},

                    limit, offset
                })
            }
            if (brandId && !typeId && categoryId && !honey) {
                devices = await Device.findAndCountAll({
                    where: {brandId, categoryId},

                    limit, offset
                })
            }
            if (brandId && typeId && categoryId && !honey) {
                devices = await Device.findAndCountAll({
                    where: {brandId, typeId, categoryId},

                    limit, offset
                })
            }


            return res.json(devices)
        } catch (e) {
            ApiError.badRequest(e.message)
        }
    }

    async getOne(req, res) {

        const {id} = req.params
        const device = await Device.findOne(
            {
                where: {id},

            }
        )
        return res.json(device)
    }


    async deleteOne(req, res) {

        const {id} = req.query
        const device = await Device.destroy({
            where: {
                id: id,

            },


        },)


        return res.json(device)
    }

}


module.exports = new DeviceController()