const jwt = require('jsonwebtoken'); //nous importons jsonwebtoken

module.exports = (req, res, next) => { //nous exportons notre fonction middleware
    try {
        const token = req.headers.authorization.split(' ')[1]; //pour récupérer notre token, nous utilisons donc la fonction split pour tout récupérer après l'espace dans le header
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET'); //nous utilisons ensuite la fonct verify avec jwt pour décoder notre token  
        const userId = decodedToken.userId; //on récupère sa propriété userId
        req.auth = { //Nous extrayons l'ID utilisateur de notre token et le rajoutons à l’objet Request afin que nos différentes routes puissent l’exploiter
            userId: userId
        };
     next(); //tout fonctionne et notre utilisateur est authentifié. Nous passons à l'exécution à l'aide de la fonction next()
    } catch(error) {
        res.status(401).json({ error });
    }
 };