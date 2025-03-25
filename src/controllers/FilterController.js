const Product = require("../models/Product");

const filterProducts = async (req, res) => {
    try {
        const { search, type, sort } = req.query;
        let query = {};

        // Apply search filter
        if (search) {
            query.name = { $regex: search, $options: 'i' };
        }

        // Apply type filter
        if (type) {
            query.type = type;
        }

        // Get products with filters
        let products = await Product.find(query);

        // Apply sorting
        if (sort) {
            if (sort === 'asc') {
                products.sort((a, b) => a.price - b.price);
            } else if (sort === 'desc') {
                products.sort((a, b) => b.price - a.price);
            }
        }

        return res.status(200).json({
            errCode: 0,
            data: products,
        });
    } catch (error) {
        return res.status(500).json({
            errCode: 1,
            message: error.message
        });
    }
};

module.exports = {
    filterProducts
};
