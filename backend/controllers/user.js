const bcrypt = require('bcrypt'); // importation de bcrypt
/*const jwt = require('jsonwebtoken'); //pour créer des token et les vérifier*/

const User = require('../models/User');
/*
exports.signup = (req, res, next) => { // fonction pour l'enregistrement de nouveaux utilisateurs
    bcrypt.hash(req.body.password, 10)//fonct pour crypter mot de passe, 10 tours de l'algorythme d'hachage,plus il y a de tour, plus l'exécution de la fonction sera longue, et plus le hachage sera sécurisé.
    .then(hash => { //méthode asynchrone (then,catch)
      const user = new User({ //création d'un nouvel utilisateur
        email: req.body.email,
        password: hash //on enregistre le mot de passe crypté qui vient de then
      });
      user.save()
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error })); //500=erreur server
};

//méthode permettant de vérifier si un utilisateur qui tente de se connecter dispose d'identifiants valides. Implémentons donc notre fonction login
exports.login = (req, res, next) => { // fonction pour connecter des utilisateurs existants
    User.findOne({email: req.body.email }) //promesse
    .then(user => {
        if (user === null) {
            res.status(401).json({ message: 'Paire identifiant/mot de passe incorrecte'});
        } else { 
        bcrypt.compare(req.body.password, user.password) //pour comparer le mot de passe entré par l'utilisateur avec le hash enregistré dans la base de données
            .then(valid => {
                if (!valid) {
                    res.status(401).json({ message: 'Paire identifiant/mot de passe incorrecte'}); //S'ils ne correspondent pas, nous renvoyons une erreur401 Unauthorized avec le même message que lorsque l’utilisateur n’a pas été trouvé, afin de ne pas laisser quelqu’un vérifier si une autre personne est inscrite sur notre site.
                } else { 
                    res.status(200).json({ //S'ils correspondent, les informations d'identification de notre utilisateur sont valides. Dans ce cas, nous renvoyons une réponse 200 contenant l'ID utilisateur et un token
                        userId: user._id,
                        token: jwt.sign( // Les tokens d'authentification permettent aux utilisateurs de se connecter une seule fois à leur compte
                        { userId: user._id },
                        'RANDOM_TOKEN_SECRET' //pour crypter notre token (à remplacer par une chaîne aléatoire beaucoup plus longue pour la production). Puisque cette chaîne sert de clé pour le chiffrement et le déchiffrement du token, elle doit être difficile à deviner
                        { expiresIn: '24h' }
                         )
                    }); //res
                } //else
            })//then
            .catch(error => { 
                res.status(500).json( { error } ); //erreurs d'execution de requête dans la base de données
            }) //catch
        }//else
   }) // then
    .catch(error => { 
        res.status(500).json( { error } );
         })
}; //export */