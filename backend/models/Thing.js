const mongoose = require('mongoose');

const thingSchema = mongoose.Schema({ //on crée un schéma de données avec toutes les infos ci-dessous dont nos objets ont besoin, pour ma base de données MongoDB
    title: { type: String, required: true }, //on crée un objet pour configurer le titre, c'est un champs obligatoire(=required: true)
    description: { type: String, required: true },
    imageUrl: { type: String, required: true }, //Pas besoin de mettre un champ pour l'Id puisqu'il est automatiquement généré par Mongoose
    userId: { type: String, required: true },
    price: { type: Number, required: true },
  });
  
  module.exports = mongoose.model('Thing', thingSchema); // on exporte ce schéma en tant que modèle Mongoose appelé « Thing », le rendant par là même disponible pour mon application Express
