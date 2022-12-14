const express = require('express');
const app = express();
const mongoose = require('mongoose')
const connectDB = require('./utils/dbConn')

require('dotenv/config')

//middlewares
const errorHandler = require('./middlewares/errorHandler.js');

//routes
const userRoute = require('./routes/userRoute');

//Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Db connection
connectDB(process.env.MONGO_URI || 'mongodb://localhost:27017')

app.use('/api/user', userRoute);

//error handler
app.use((err, req, res, next) => {
    console.log("ErrorHandler: Error ",err.stack)
});


app.get("/", errorHandler((req, res, next) => {
   res.status(200).json({
        status: true,
        message: "Welcome"
    })
}))

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})