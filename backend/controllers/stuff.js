const Thing = require('../models/thing'); //on importe le thing
const fs = require('fs'); //??

exports.createThing = (req, res, next) => { //lié à la route post
    const thingObject = JSON.parse(req.body.thing); //objet envoyé en json parse
    delete thingObject._id; //on supprime dans cet objet le champ id car il sera généré automatiquement par notre base de donnée
    delete thingObject._userId; //on supprime dans cet objet le champ userid qui correspond à la personne qui a créée l'objet car nous ne voulons pas faire confiance au client, on utilisera l'id venant du token d'authentification
    const thing = new Thing({ //on créé notre objet sans les 2 champs supprimés
        ...thingObject,
        userId: req.auth.userId, //on extrait les userid de l'objet requête grâce au middleware
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` //on génère l'url de l'image
    });
  
    thing.save() //on enregistre l'objet dans la base de donnée avec save
    .then(() => { res.status(201).json({message: 'Objet enregistré !'})})
    .catch(error => { res.status(400).json( { error })})
 };

/*exports.createThing = (req, res, next) => { // Placer la route POST au-dessus interceptera les requêtes POST, en les empêchant d'atteindre le middleware GET
    delete req.body._id; //on supprime l'id qui était dans le champs du body dans le frontend, il est faux + généré par MongonDB automatiquement
    const thing = new Thing({
      ...req.body //raccourci JS (opérateur spread) qui copie tous les éléments de req.body (title...)
    });
    thing.save() //pour enregistrer thing/l'objet dans la base de donnée, la méthode save() renvoie une Promise
      .then(() => res.status(201).json({ message: 'Objet enregistré !'})) //Promise (then)pour envoyer une réponse de réussite avec un code 201 de réussite au frontend, sinon expiration de la requête
      .catch(error => res.status(400).json({ error })); //pour envoyer une réponse avec l'erreur générée par Mongoose ainsi qu'un code d'erreur 400, raccourci js (error)
  };*/

  /*exports.modifyThing = (req, res, next) => {
    Thing.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id }) //pour modif un thing dans la base de donnée, 1er argument dans {} et 2ème argu dans {}
      .then(() => res.status(200).json({ message: 'Objet modifié !'}))
      .catch(error => res.status(400).json({ error }));
  };*/

  exports.modifyThing = (req, res, next) => {  //lié à la route put
    const thingObject = req.file ? { //extraction de l'objet, on voit s'il y a un champ file
        ...JSON.parse(req.body.thing), //s'il y a un champ file, on récupère l'objet en parsant la chaine de caractères, transforme un objet stringifié en Object JavaScript exploitable
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` //on recrée l'url, besoin dereq.protocol  et de req.get('host'), connectés par  '://'  et suivis de req.file.filename, pour reconstruire l'URL complète du fichier enregistré
    } : { ...req.body }; //s'il n'y a pas d'objet transmis,on récupère l'objet directement dans le corps de la requête
  
    delete thingObject._userId; // suppression d'userTId pour éviter que qq'un crée un objet à son nom puis le modifie pour le réassigner à quelqu'un d'autre
    Thing.findOne({_id: req.params.id}) //on récupère l'objet dans la base de donnée 
        .then((thing) => { 
            if (thing.userId != req.auth.userId) { //pour vérifier si c'est bien l'utilisateur à qui appartient cet objet qui cherche à le modifier (est ce que userId de la base est différent de l'userId du token?)
                res.status(401).json({ message : 'Not authorized'}); //si c'est non, message négatif
            } else { //si c'est bon
                Thing.updateOne({ _id: req.params.id}, { ...thingObject, _id: req.params.id})  //mettre à jour notre enregistrement ave le filtre+quel objet+ce qu'est récup dans le corps de la fonction+ id paramètre de URL
                .then(() => res.status(200).json({message : 'Objet modifié!'})) // si c'est bon, message de succès
                .catch(error => res.status(401).json({ error })); //si non, on renvoie error
            }
      })
        .catch((error) => {
            res.status(400).json({ error });
        });
 };

  exports.deleteThing = (req, res, next) => {
    Thing.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
      .catch(error => res.status(400).json({ error }));
  };

  exports.getOneThing = (req, res, next) => { //nous utilisons la méthode get() pour répondre uniquement aux demandes GET à cet endpoint, nous utilisons deux-points : en face du segment dynamique de la route pour la rendre accessible en tant que paramètre
    Thing.findOne({ _id: req.params.id }) //nous utilisons ensuite la méthode findOne() dans notre modèle Thing pour trouver le Thing unique ayant le même _id que le paramètre de la requête 
     .then(thing => res.status(200).json(thing)) //ce Thing est ensuite retourné dans une Promise et envoyé au front-end
      .catch(error => res.status(404).json({ error })); //si aucun Thing n'est trouvé ou si une erreur se produit, nous envoyons une erreur 404 au front-end, avec l'erreur générée
  };

  exports.getAllThings = (req, res, next) => {   //frontend va récupérer cette url
    console.log('abc');
    Thing.find() // utilisons la méthode find() dans notre modèle Mongoose afin de renvoyer un tableau contenant tous les Things dans notre base de données
       .then(things => res.status(200).json(things)) //on récupère le tableau avec tous les things retournés par la base de donnée
    .catch(error => res.status(400).json({ error }));
    };