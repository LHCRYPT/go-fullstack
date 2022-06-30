const bcrypt = require('bcrypt'); // importation de bcrypt

const User = require('../models/User');

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
        bcrypt.compare(req.body.password, user.password)
            .then(valid => {
                if (!valid) {
                    res.status(401).json({ message: 'Paire identifiant/mot de passe incorrecte'});
                } else { 
                    res.status(200).json({
                        userId: user._id,
                        token: 'TOKEN'
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
}; //export 