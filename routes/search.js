var express = require('express');
var router = express.Router();

const movies = require('../data/movies');
const peoples = require('../data/people');

// Query is required
function queryRequired(req, res, next){
    const searchTerm = req.query.query;
    if(!searchTerm){
        res.json({msg: 'Search Query is required'});
    }else{
        next()
    }
  } 
 
  router.use(queryRequired)


// Get Search / Movie
router.get('/movie', (req, res, next) => {
    const searchTerm = req.query.query;
    const results = movies.filter((movie) => {
      let found = movie.overview.includes(searchTerm) || movie.title.includes(searchTerm)
      return found;
  })
    res.json({results})
})

// Get Search / Person
router.get('/person', (req, res, next) => {
    const searchTerm = req.query.query;
    const results = peoples.filter((people) => {
      let found = people.name.includes(searchTerm);
      return found;
  })
    res.json({results})
})

 

module.exports = router;
