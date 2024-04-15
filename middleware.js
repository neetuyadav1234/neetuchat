const jwt = require('jsonwebtoken');

const validJWTNeeded = async (req, res, next) => {
    if (req.headers['authorization']) {
        try {
            console.log("req,header", req.headers)
            let authorization = req.headers['authorization'].split(' ');
            console.log(">>>>>>>>>>auth", authorization)
            if (!authorization) {
                return res.status(401).send('Invalid token'); // Invalid request
            } else {
                const decodedToken = jwt.verify(authorization[1], "secrete key");
                console.log('hjjjk', decodedToken)
                req.verifyUser = decodedToken;

                return next();
            }
        } catch (err) {
            console.error("JWT verification error:", err);
            return res.status(403).send('Forbidden'); // Invalid token
        }
    } else {
        return res.status(401).send('Unauthorized'); // Authorization header missing
    }
}

module.exports = validJWTNeeded;
