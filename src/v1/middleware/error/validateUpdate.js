const { body, validationResult } = require('express-validator');

async function validateInsert(req, res, next) {
    const bodyKeys = Object.keys(req.body);
    const validationRules = [];

    bodyKeys.forEach(key => {
        switch (key) {
            case 'id':
                validationRules.push(body(key).toInt());
                break;
            case 'product_name':
            case 'brand':
            case 'expiration_date':
            case 'category':
            case 'supplier':
                validationRules.push(body(key).trim().escape());
                break;
            case 'price':
                // dont allow string and negative numbers
                validationRules.push(
                    body(key).toFloat().custom(value => {
                        if (isNaN(value) || value < 0) {
                            throw new Error('Price must be a non-negative number');
                        }
                        return true;
                    })
                );
                break;
            case 'quantity':
                // dont allow string and negative numbers
                validationRules.push(
                    body(key).toInt().custom(value => {
                        if (isNaN(value) || value < 0) {
                            throw new Error('Quantity must be a non-negative number');
                        }
                        return true;
                    })
                );
                break;
            default:
                // Ignore other keys
                break;
        }
    });

    try {
        await Promise.all(validationRules.map(validation => validation.run(req)));
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() });
        }

        next();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

module.exports = validateInsert;
