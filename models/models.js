const sequelize = require('../db')
const DataTypes = require('sequelize');

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true,},
    password: {type: DataTypes.STRING,},
    role: {type: DataTypes.STRING, defaultValue: "USER"},
})

const Basket = sequelize.define('basket', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        phone: {type: DataTypes.STRING, allowNull: false},




})
const TypeBrand = sequelize.define('type_brand', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})
const BasketDevice = sequelize.define('basket_device', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    count: {type: DataTypes.INTEGER, allowNull:false,defaultValue: 1}


})

const Category = sequelize.define('category', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false}
})

const Device = sequelize.define('device', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    aliasName: {type: DataTypes.STRING, unique: true, allowNull: false},
    article: {type: DataTypes.INTEGER, unique: true, allowNull: false},
    quantity: {type: DataTypes.STRING, allowNull: true},
    price: {type: DataTypes.INTEGER, allowNull: false},
    rating: {type: DataTypes.INTEGER, defaultValue: 0},
    img: {type: DataTypes.STRING, allowNull: false},

})

const Unit = sequelize.define('unit', {
    id: {type: DataTypes.INTEGER,primaryKey:true, autoIncrement: true},
    name: {type: DataTypes.STRING,unique: true, allowNull: false },

})


const Available = sequelize.define('available', {
    id: {type: DataTypes.INTEGER,primaryKey:true, autoIncrement: true},
    name: {type: DataTypes.STRING,unique: true, allowNull: false },
})



 const Type = sequelize.define('type', {
     id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
     name: {type: DataTypes.STRING, unique: true, allowNull: false},
     img: {type: DataTypes.STRING, allowNull: true}
 })

const Brand = sequelize.define('brand', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
})

const Rating = sequelize.define('rating', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    rate: {type: DataTypes.INTEGER, allowNull: false},
})

const DeviceInfo = sequelize.define('device_info', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
})

const DeviceInfoDescription = sequelize.define('device_info_description', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},


})



Unit.hasMany(Device)
Device.belongsTo(Unit)

Available.hasMany(Device)
Device.belongsTo(Available)

User.hasMany(Rating)
Rating.belongsTo(User)

Basket.hasMany(BasketDevice)
BasketDevice.belongsTo(Basket)

Type.hasMany(Device)
Device.belongsTo(Type)

Brand.hasMany(Device)
Device.belongsTo(Brand)

Category.hasMany(Device)
Device.belongsTo(Category)

Device.hasMany(Rating)
Rating.belongsTo(Device)

Device.hasMany(BasketDevice)
BasketDevice.belongsTo(Device)

DeviceInfo.hasMany(DeviceInfoDescription )
DeviceInfoDescription.belongsTo(DeviceInfo )


Device.hasMany(DeviceInfoDescription,)
DeviceInfoDescription.belongsTo(Device)

Type.hasMany(DeviceInfo)
DeviceInfo.belongsTo(Type)

Type.hasMany(DeviceInfoDescription)
DeviceInfoDescription.belongsTo(Type)


Type.belongsToMany(Brand, {through: TypeBrand})
Brand.belongsToMany(Type, {through: TypeBrand})

Category.hasMany(Type)
Type.belongsTo(Category)


module.exports = {
    DeviceInfo,
    Device,
    Type,
    TypeBrand,
    BasketDevice,
    Basket,
    Brand,
    Rating,
    User,
    Category,
    DeviceInfoDescription,
    Unit,
    Available
}