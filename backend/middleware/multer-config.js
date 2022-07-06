const multer = require('multer'); //on importe multer

const MIME_TYPES = { //dictionnaire
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

const storage = multer.diskStorage({ // on crée un objet de configuration pour mulder et on l'enregistre sur le disque
  destination: (req, file, callback) => { // destination dit à multer d'enregistrer les fichiers dans le dossier images, il y a 3 arguments : req file callback
    callback(null, 'images'); //on appelle le call back; null pour dire qu'il n'y a pas eu d'erreur à ce niveau là, dossier image en 2ème argument
  },
  filename: (req, file, callback) => { //il dit au multer d'utiliser le nom d'origine, de remplacer les espaces par des underscores et d'ajouter un timestamp Date.now() comme nom de fichier
    const name = file.originalname.split(' ').join('_'); //on accède au nom pour le fichier avec originalname, split permet de supprimer les espaces dans le nom du fichier et join de les remplacer par des undescores _
    const extension = MIME_TYPES[file.mimetype]; // création de l'extension de notre fichier : élement de notre dictionnaire qui correspond au mime types du fichier envoyé par le frontend
    callback(null, name + Date.now() + '.' + extension); //nom sans les espaces avec une date pour qu'il soit plus unique et l'extension
  }
});

module.exports = multer({storage: storage}).single('image'); //pour exporter notre middleware multer complètement configuré, single : fichier unique,  lui passons notre constante storage et lui indiquons que nous gérerons uniquement les téléchargements de fichiers image