var express = require('express');
var router = express.Router();

const movieDetails = require('../data/movieDetails');

function requireJSON(req, res, next){
  if(!req.is('application/json')){
    res.send('content type must be application/json')
  }else{
    next();
  }
}

router.param(('movieId'), (req, res, next ) => {
  console.log('some one hit the route the movie wildcards');
  next()
})
  /** Get Top Rated **/ 
router.get('/top_rated', (req, res, next) => {
  let page = req.query.page;
  if(!page){
    page = 0;
  }
  const results = movieDetails.sort((a, b) => {
    return b.vote_average - a.vote_average;
  })
  const indexToStart = (page -1 ) * 20;
res.json(results.slice(indexToStart, indexToStart + 19));
});


/* GET movie page. */
router.get('/:movieId', function(req, res, next) {
  const movieId = req.params.movieId;
  
   const results = movieDetails.find((movie) => {
     return movie.id == movieId;
   }); 
   if(!results){
     res.json({
       msg: 'Movie Id is not found',
       production_companies: []
     })
   }else{
     res.json(results)
   }
 });

 router.post('/:movieId/rating', requireJSON,  (req, res, next) => {
   const movieId = req.params.movieId;
  //  console.log(req.get('content-type'))
  const userRating = req.body.value;
 if((userRating < .5) || (userRating > 10)){
  res.json({msg: 'Rating must be between .5 and 10'})
 }else{
  res.json({
    msg: 'Thank you for submitting your valuable rating', 
    status_code: 200
})
 }
 });

 router.delete('/:movieId/rating', requireJSON,  (req, res, next) => {
  res.json({msg: 'Rating deleted'})
 })


module.exports = router;
