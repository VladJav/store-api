const getAllProducts = (req, res) => {
    res.status(200).json({msg: 'All products'});
}

module.exports = {
    getAllProducts
}