const mongoose = require('mongoose');

module.exports = () => {
    mongoose.connect('mongodb+srv://movie_user:abcd1234@cluster0.g3tjmb3.mongodb.net/movie-api');
    mongoose.connection.on('open', () => {
        console.log('MongoDB: Connected');
    });
    mongoose.connection.on('error', (err) => {
        console.log('MongoDB: Error', err);
    });

    mongoose.Promise = global.Promise;
};