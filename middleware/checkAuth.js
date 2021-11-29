const jwt = require('jsonwebtoken');

const checkAuth = (req, res, next) => {
    console.log('Checking Authentication');
    if (typeof req.cookies.nToken === 'undefined' || req.cookies.nToken === null) {
        req.user = null;
        console.log('No token found');
    } else {
        const token = req.cookies.nToken;
        const decodedToken = jwt.decode(token, { complete: true}) || {};
        req.user = decodedToken.payload;
    }
    next();
}

module.exports = checkAuth;