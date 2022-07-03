const jwt = require('jsonwebtoken'); //nous importons jsonwebtoken

module.exports = (req, res, next) => { //nous exportons notre fonction middleware
    try {
        const token = req.headers.authorization.split(' ')[1]; //pour récupérer notre token
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET'); //pour décoder le token + mot de passe avec jwt
        const userId = decodedToken.userId; //on récupère sa propriété userId
        req.auth = {
            userId: userId
        };
     next();
    } catch(error) {
        res.status(401).json({ error });
    }
 };