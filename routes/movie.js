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

//search movie by years
router.get('/between/:start_year/:end_year', (req, res, next) => {
  const {start_year, end_year} = req.params;
  Movie.find(
    {
      year: {"$gte": Number(start_year), "$lte": Number(end_year)}
    },
    (err, movie) => {
      if(!movie){
        const error = new Error("No Movie Found");
        error.status = 404;
        next(error);
      }else{
        res.json(movie);
      }
    }
  );
});

//top10
router.get('/top10', (req, res, next) => {
  Movie.find(
    (err, movie) => {
      if(!movie){
        const error = new Error("No Movie Found");
        error.status = 404;
        next(error);
      }else{
        res.json(movie);
      }
    }
  ).limit(10).sort({imdb_score: -1});
});

//get movie detail
router.get('/:movie_id', (req, res, next) => {
  Movie.findById(
    req.params.movie_id,
    (err, movie) => {
      if(!movie){
        const error = new Error("Movie Not Found");
        error.status = 404;
        next(error);
      }else{
        res.json(movie);
      }
    }
  );
});

//delete movie
router.delete('/:movie_id', (req, res, next) => {
  Movie.findByIdAndRemove(
    req.params.movie_id,
    (err, movie) => {
      if(!movie){
        const error = new Error("Movie Doesn't Exist");
        error.status = 404;
        next(error);
      }else{
        res.json({
          status: 200,
          message: "movie deleted"
        });
      }
    }
  );
});

//update movie
router.put('/:movie_id', (req, res, next) => {
  Movie.findByIdAndUpdate(
    req.params.movie_id,
    req.body,
    {
      new: true,
    },
    (err, movie) => {
      if(!movie){
        const error = new Error("Movie Couldn't Update");
        error.status = 404;
        next(error);
      }else{
        res.json(movie);
      }
    }
  );
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
