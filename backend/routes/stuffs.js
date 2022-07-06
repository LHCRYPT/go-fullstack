const express = require('express');
const auth = require('../middleware/auth'); //pour importer ce middleware dans notre routeur
const router = express.Router(); //on créé le routeur avec la méthode routeur d'express
const multer = require('../middleware/multer-config');

const stuffCtrl = require('../controllers/stuff'); //on importe stuff de controllers avec stuffCtrl


router.get('/', auth, stuffCtrl.getAllThings);//pour récupérer toutes les choses
router.post('/', auth, multer, stuffCtrl.createThing); //Dans notre routeur stuff, nous importons notre middleware et le passons comme argument aux routes à protéger
router.get('/:id', auth, stuffCtrl.getOneThing);
router.put('/:id', auth, multer, stuffCtrl.modifyThing); //on met multer pour pouvoir modifier des objets
router.delete('/:id', auth, stuffCtrl.deleteThing);



module.exports = router; //on réexporte le routeur de ce fichier là

/*const Thing = require('../models/thing'); //Pour pouvoir utiliser notre nouveau modèle Mongoose dans l'application, nous devons l'importer dans le fichier stuff.js */


/*router.post('/', );*/

  /*router.post('/', (req, res, next) => { // Placer la route POST au-dessus interceptera les requêtes POST, en les empêchant d'atteindre le middleware GET
    delete req.body._id; //on supprime l'id qui était dans le champs du body dans le frontend, il est faux + généré par MongonDB automatiquement
    const thing = new Thing({
      ...req.body //raccourci JS (opérateur spread) qui copie tous les éléments de req.body (title...)
    });
    thing.save() //pour enregistrer thing/l'objet dans la base de donnée, la méthode save() renvoie une Promise
      .then(() => res.status(201).json({ message: 'Objet enregistré !'})) //Promise (then)pour envoyer une réponse de réussite avec un code 201 de réussite au frontend, sinon expiration de la requête
      .catch(error => res.status(400).json({ error })); //pour envoyer une réponse avec l'erreur générée par Mongoose ainsi qu'un code d'erreur 400, raccourci js (error)
  }); */

  

/* router.put('/:id', (req, res, next) => {
    Thing.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id }) //pour modif un thing dans la base de donnée, 1er argument dans {} et 2ème argu dans {}
      .then(() => res.status(200).json({ message: 'Objet modifié !'}))
      .catch(error => res.status(400).json({ error }));
  });*/

  /*router.delete('/:id', (req, res, next) => {
    Thing.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
      .catch(error => res.status(400).json({ error }));
  });*/

  /*router.get('/:id', (req, res, next) => { //nous utilisons la méthode get() pour répondre uniquement aux demandes GET à cet endpoint, nous utilisons deux-points : en face du segment dynamique de la route pour la rendre accessible en tant que paramètre
    Thing.findOne({ _id: req.params.id }) //nous utilisons ensuite la méthode findOne() dans notre modèle Thing pour trouver le Thing unique ayant le même _id que le paramètre de la requête 
     .then(thing => res.status(200).json(thing)) //ce Thing est ensuite retourné dans une Promise et envoyé au front-end
      .catch(error => res.status(404).json({ error })); //si aucun Thing n'est trouvé ou si une erreur se produit, nous envoyons une erreur 404 au front-end, avec l'erreur générée
  });

router.get('/', (req, res, next) => {   //frontend va récupérer cette url
  Thing.find() // utilisons la méthode find() dans notre modèle Mongoose afin de renvoyer un tableau contenant tous les Things dans notre base de données
  .then(things => res.status(200).json(things)) //on récupère le tableau avec tous les things retournés par la base de donnée
  .catch(error => res.status(400).json({ error }));
  });*/

