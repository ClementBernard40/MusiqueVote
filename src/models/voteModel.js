const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let voteSchema = new Schema ({
    vote: {
        type: Number,
        require: true
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    music_id: {
        type: String
    }
})

module.exports = mongoose.model('vote', voteSchema);