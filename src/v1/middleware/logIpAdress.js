// Middleware to log user IP address
const logIPAddress = (req, res, next) => {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    console.log('User IP address:', ip);
    next();
};

module.exports = logIPAddress
