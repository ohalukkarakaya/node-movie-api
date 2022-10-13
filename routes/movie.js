var express = require('express');
var router = express.Router();

//Models
const Movie =  require('../models/Movie');

//get all movies
router.get('/', (req, res) => {
  const promise =  Movie.find({ });

  promise.then((data) => {
    res.json(data);
  }).catch((err) => {
    res.json(err);
  });
});

//get movie detail
router.get('/:movie_id', (req, res) => {
  const promise = Movie.findById(req.params.movie_id);

  promise.then((movie) => {
    if(!movie)
      next({message: 'The Movie Was Not Found'});
      
    res.json(movie);
  }).catch((err) => {
    res.json(err);
  })
})

//post movie
router.post('/', (req, res, next) => {
  const movie = new Movie(req.body);
  const promise = movie.save();

  promise.then((data) => {
    res.json({ status: 1});
  }).catch((err) => {
    res.json(err);
  });

});

module.exports = router;
