const express = require('express')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const DBConnect = require('./database/DBConnection')
const authRoute = require('./routes/authRoute')
const userRoute = require('./routes/userRoute')
const adminRoute = require('./routes/adminRoute')




dotenv.config()
const app = express()
app.use(cookieParser())
app.use(bodyParser.json())
app.use(express.json())


app.use('/api', authRoute)
app.use('/api', userRoute)
app.use('/api', adminRoute)


const PORT = process.env.PORT || 8000
DBConnect()

app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`)
})