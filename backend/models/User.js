const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator'); //améliore les messages d'erreur lors de l'enregistrement de données uniques

const userSchema = mongoose.Schema({
email: { type: String, required: true, unique: true }, //unique:pour ne pas pouvoir s'inscrire plusieurs fois avec le même email
password: { type: String, required: true } //mot de passe crypté
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
