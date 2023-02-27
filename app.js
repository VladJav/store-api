require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');
const connectDB = require('./db/connect');
const productRouter = require('./routes/products');

const port = process.env.PORT || 8000;

app.use(express.json());

app.use('/api/v1/products', productRouter);

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