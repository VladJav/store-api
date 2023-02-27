require('dotenv').config();

const mongoose = require('mongoose');
const productsJSON = require('./products.json');
const Product = require('./models/product');

const start = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI);
        await Product.deleteMany({});
        await Product.create(productsJSON);
        console.log('Success');
        process.exit();
    }
    catch (e){
        console.log(e);
        process.exit();
    }
};

start();