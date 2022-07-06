const multer = require('multer'); //on importe multer

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

const storage = multer.diskStorage({ // on crée un objet de configuration pour mulder et on l'enregistre sur le disque
  destination: (req, file, callback) => { // dit dans quel dossier enregistrer les fichiers, il y a 3 arguments : req file callback
    callback(null, 'images');
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extension);
  }
});

module.exports = multer({storage: storage}).single('image');