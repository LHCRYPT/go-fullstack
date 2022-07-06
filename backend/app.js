const express = require('express');
const app = express(); //pareil que bodyparser
const mongoose = require('mongoose');
const path = require('path'); //pour accéder au path de notre serveur 

const Thing = require('./models/thing');

const stuffRoutes = require('./routes/stuffs');
const userRoutes = require('./routes/user');//importation du routeur 

mongoose.connect('mongodb+srv://toto:56_cPy-3@cluster0.m8xxyhv.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


 
app.use(express.json()); //pareil que bodyparser

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});


app.use('/api/stuff', stuffRoutes);
app.use('/api/auth', userRoutes); //on enregistre le routeur lié à l'authentification
app.use('/images', express.static(path.join(__dirname, 'images'))); //ça indique à Express de gérer la ressource images de manière statique (un sous-répertoire de notre répertoire de base, __dirname) à chaque fois qu'elle reçoit une requête vers la route /images.

module.exports = app;

