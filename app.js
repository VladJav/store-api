require('dotenv').config();

const express = require('express');
const app = express();
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');
const connectDB = require('./db/connect');

const port = process.env.PORT || 8000;

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const start = async () => {
    try{
        await connectDB(process.env.MONGO_URI);
        app.listen(port, () => {
            console.log(`Server is listening in port ${port}`);
        })
    }
    catch (e) {
        console.log(e);
    }
}

start();