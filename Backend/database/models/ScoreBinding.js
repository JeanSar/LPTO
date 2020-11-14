const mongoose = require('mongoose');

const ScoreBindingSchema = new mongoose.Schema({
    username : {
        type : String,
        required: true,
        minlength: 3,
    },
    game: {
        type : String,
        required : true,
    },
    score : {
        type : Number
    }
})

const ScoreBinding = mongoose.model('ScoreBinding',ScoreBindingSchema);

module.exports = ScoreBinding;