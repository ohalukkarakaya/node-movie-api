const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
    director_id: Schema.Types.ObjectId,
    title: {
        type: String,
        required: [true, '`{PATH}` Alanı Zorunludur'],
        maxLength: [15, '`{PATH}` Alanı (`{VALUE}`), `{MAXLENGTH}` Karakterden Az Olmalıdır'],
        minLength: [1, '`{PATH}` Alanı (`{VALUE}`), `{MINLENGTH}` Karakterden Fazla Olmalıdır'],
    },
    category: {
        type: String,
        maxLength: 30,
        minLength: 1,

    },
    country: {
        type: String,
        maxLength: 30,
        minLength: 1,
    },
    year: Number,
    imdb_score: {
        type: Number,
        max: 10,
        min: 0,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('movie', MovieSchema);