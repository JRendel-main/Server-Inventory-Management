function validateAdd(req, res, next) {
    const { product_name, brand, price, quantity, expiration_date, category, supplier } = req.body;
    const requiredFields = ['product_name', 'brand', 'price', 'quantity', 'expiration_date', 'category', 'supplier'];
    const nullFields = requiredFields.filter(field => !req.body[field]);

    if (nullFields.length > 0) {
        return res.status(400).json({
            success: false,
            message: 'The following fields are missing!',
            data: nullFields
        });
    }

    const parsedPrice = parseFloat(price);
    const parsedQuantity = parseInt(quantity);

    if (isNaN(parsedPrice)) {
        return res.status(400).json({
            success: false,
            message: "Price is not a valid number!"
        });
    }

    if (parsedPrice < 0) {
        return res.status(400).json({
            success: false,
            message: "Price cannot be negative!"
        });
    }

    if (isNaN(parsedQuantity)) {
        return res.status(400).json({
            success: false,
            message: "Quantity is not a valid number!"
        });
    }

    if (parsedQuantity < 0) {
        return res.status(400).json({
            success: false,
            message: "Quantity cannot be negative!"
        });
    }

    next();
}

module.exports = validateAdd;
