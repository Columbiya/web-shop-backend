import sequalize from "../db.js";
import { DataTypes } from "sequelize";

const User = sequalize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: 'USER'}
})

const Basket = sequalize.define('basket', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}, //внещние ключи sequelize подставит сам, когда буду описывать типы связей
})

const BasketDevice = sequalize.define('basket_device', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}, //внещние ключи sequelize подставит сам, когда буду описывать типы связей
})

const Device = sequalize.define('device', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}, //внещние ключи sequelize подставит сам, когда буду описывать типы связей
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    price: {type: DataTypes.INTEGER, allowNull: false},
    rating: {type: DataTypes.INTEGER, defaultValue: 0},
    img: {type: DataTypes.STRING, allowNull: false}
})

const Type = sequalize.define('type', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}, //внещние ключи sequelize подставит сам, когда буду описывать типы связей
    name: {type: DataTypes.STRING, unique: true, allowNull: false}
})

const Brand = sequalize.define('brand', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}, //внещние ключи sequelize подставит сам, когда буду описывать типы связей
    name: {type: DataTypes.STRING, unique: true, allowNull: false}
})

const Rating = sequalize.define('rating', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}, //внещние ключи sequelize подставит сам, когда буду описывать типы связей
    rate: {type: DataTypes.INTEGER, allowNull: false}
})

const DeviceInfo = sequalize.define('device_info', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}, //внещние ключи sequelize подставит сам, когда буду описывать типы связей
    title: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: false}
})

const TypeBrand = sequalize.define('type_brand', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}, //внещние ключи sequelize подставит сам, когда буду описывать типы связей
})



User.hasOne(Basket)
Basket.belongsTo(User)

User.hasMany(Rating)
Rating.belongsTo(User)

Basket.hasMany(BasketDevice)
BasketDevice.belongsTo(Basket)

Device.hasMany(BasketDevice)
BasketDevice.belongsTo(Device)

Device.hasMany(Rating)
Rating.belongsTo(Device)

Type.hasMany(Device)
Device.belongsTo(Type)

Brand.hasMany(Device)
Device.belongsTo(Brand)

Device.hasMany(DeviceInfo, {as: 'info'})
DeviceInfo.belongsTo(Device)

Type.belongsToMany(Brand, {through: TypeBrand}) //когда обе связуемых друг с другом таблицы many to many друг к другу, то создается третья таблица, в которую и будет помещаться нужная инфа в through
Brand.belongsToMany(Type, {through: TypeBrand})

export default {
    User,
    Rating,
    Basket,
    BasketDevice,
    Type,
    Device,
    Brand,
    DeviceInfo,
    TypeBrand
}