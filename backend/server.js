require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const adminRouter = require('./routes/adminRouter')
const userRouter = require('./routes/userRouter')
const groupRouter = require("./routes/groupRouter")
const projectRouter = require("./routes/projectRouter")

const app = express()
app.use(express.json())
app.use(cors())

//routes
app.use('/admin',adminRouter)
app.use('/api/user',userRouter)
app.use('/api/group',groupRouter)
app.use('/api/project',projectRouter)

//listen server
const PORT = process.env.PORT
app.listen(PORT, () =>{
    console.log('Server is running on port',PORT)
})

//connect to mongodb
const URI = process.env.MONGODB_URL
mongoose.connect(URI,{
    useCreateIndex: true,
    //useFindAndModify: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err => {
    if(err) throw err;
    console.log('MongoDB connection successfull')
})