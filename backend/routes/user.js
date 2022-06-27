const express = require('express'); //pour créer un routeur
const router = express.Router();
const userCtrl = require('../controllers/user'); //pour associer les fonctions aux différentes routes

router.post('/signup', userCtrl.signup); //on utilise post car le front va envoyer l'adresse mail méthode signup
router.post('/login', userCtrl.login); //on utilise post car le front va envoyer le mot de passe fonct login

module.exports = router;