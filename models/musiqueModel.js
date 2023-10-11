const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let MusicSchema = new Schema ({
    url: {
        type: String,
        require: true
    },
    nom: {
        type: String,
        require: "Le contenu est requis"
    },
    prenom: {
        type: String,
        require: "Le contenu est requis"
    },
    created_at: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Music', musicSchema);