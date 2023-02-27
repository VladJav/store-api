const express = require('express');
const app = express();
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

const port = process.env.PORT || 8000;

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const start = async () => {
    app.listen(port, () => {
        console.log(`App is listening in port ${port}`)
    })
}

start();