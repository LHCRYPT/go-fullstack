const multer = require('multer'); //on importe multer

const MIME_TYPES = { //dictionnaire
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

const storage = multer.diskStorage({ // on crée un objet de configuration pour mulder et on l'enregistre sur le disque
  destination: (req, file, callback) => { // dit dans quel dossier enregistrer les fichiers, il y a 3 arguments : req file callback
    callback(null, 'images'); //on appelle le call back; null pour dire qu'il n'y a pas eu d'erreur à ce niveau là, dossier image en 2ème argument
  },
  filename: (req, file, callback) => { //il va dire au multer quel nom utiliser
    const name = file.originalname.split(' ').join('_'); //on accède au nom pour le fichier avec originalname, split permet de supprimer les espaces dans le nom du fichier et join de les remplacer par des undescores _
    const extension = MIME_TYPES[file.mimetype]; // création de l'extension de notre fichier : élement de notre dictionnaire qui correspond au mine type du fichier envoyé par le frontend
    callback(null, name + Date.now() + '.' + extension); //nom sans les espaces avec une date pour qu'il soit plus unique et l'extension
  }
});

module.exports = multer({storage: storage}).single('image'); //pour exporter notre middleware multer complètement configuré, single : fichier unique, 