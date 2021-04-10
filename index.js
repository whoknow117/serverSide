require('dotenv').config()
const express = require('express')
const cors = require('cors')
const sequelize = require('./db')
const models = require('./models/models')
const fileUpload = require('express-fileupload')
const router = require('./routes/index')
const authMiddleware = require('./middlewares/AutMiddleware')
const errorHandler = require('./middlewares/ErrorHandlingMiddleware')
const PORT =  process.env.PORT || 5000
const path = require('path')

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname,'static')))
app.use(express.static(path.resolve(__dirname,'static2')))
app.use(fileUpload({}))
app.use('/api', router)
app.use(authMiddleware)

app.use(errorHandler)

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()

        app.listen( process.env.PORT || PORT, () => console.log(`start on ${PORT}`))
    }
    catch (e) {

    }
}

start()