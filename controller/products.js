const Product = require('../models/product');

const getAllProducts = async (req, res) => {
    const { sort = '', fields = '', page: pageQuery = 1, limit: limitQuery = 10, numericFilters = ''} = req.query;

    const sortList = sort.split(',').join(' ');
    const fieldsList = fields.split(',').join(' ');
    const page = Number(pageQuery);
    const limit = Number(limitQuery);
    const skip = (page - 1) * limit;

    let queryObject = {...req.query};

    if(numericFilters){
        const operatorMap = {
            '>': '$gt',
            '>=': '$gte',
            '=': '$eq',
            '<': '$lt',
            '<=': '$lte',
        }
        const regEx = /\b(<|>|<=|>=|=)\b/g;
        let filters = numericFilters.replace(regEx, (match) => `-${operatorMap[match]}-`);

        const options = ['price', 'rating'];
        filters.split(',').forEach((item)=>{
           const [field, operator, value] = item.split('-');
           if(options.includes(field)){
               queryObject[field] = {[operator]: Number(value)};
           }
        });
    }

    const products = await Product.find(queryObject)
        .sort(sortList)
        .select(fieldsList)
        .skip(skip)
        .limit(limit);
    const productsCount = await Product.countDocuments(req.query);
    res.status(200).json({products, nbHits: products.length, productsCount});
}

module.exports = {
    getAllProducts,
}