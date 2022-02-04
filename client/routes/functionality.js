var express = require('express');
const getCandidates = require('../midleware/getCandidates.js');
const getOneCandidate = require('../midleware/getOneCandidate.js')
var router = express.Router();
var services = require('../services/services.js')


router.get('/', function(req, res, next) {
  let endpoint = req.originalUrl.split('/')[1]
    services.getAll(endpoint)
    .then(x => res.render(endpoint, { title: endpoint , data: x}))
    
  });
  router.get('/create', function(req, res, next) {
    let endpoint = req.originalUrl.split('/')[1]
    res.render(`${endpoint}`+'Create', {action:`create`});
  });
  router.post('/create', function(req, res, next) {
    let endpoint = req.originalUrl.split('/')[1]
    services.postJobsData (endpoint, req.body)
    .catch(Error)
    res.redirect(`/${endpoint}`);
  });
  router.get('/delete/:_id', function(req, res, next) {
    let endpoint = req.originalUrl.split('/')[1]
    services.delete (endpoint, req.params._id)
    .then(x=>console.log(x.status))
    .catch(Error)
      res.redirect(`/${endpoint}`);
  });
  router.get('/update/:_id', function(req, res, next) {
    let endpoint = req.originalUrl.split('/')[1]
    services.getOne(endpoint, req.params._id)
    .then(x => res.render(`${endpoint}`+'Create', { action:`${x._id}`, title: x.title , description: x.description, firstName: x.firstName, lastName: x.lastName, email: x.email }))
   });
  router.post('/update/:_id', function(req, res, next) {
    let endpoint = req.originalUrl.split('/')[1]
    services.edit (endpoint,req.params._id, req.body)
    .then(x=>console.log(x.status))
    .catch(Error)
    res.redirect(`/${endpoint}`);
  });
  router.get('/details/:_id', getCandidates, function(req, res, next, {}) {
    let endpoint = req.originalUrl.split('/')[1]
    services.getOne(endpoint, req.params._id)
    .then(x =>
      {console.log('success')
      res.render(`${endpoint}`+`Details`, { action: req.params._id, title: x.title , description: x.description, candidate: x.candidates, firstName: x.firstName, lastName: x.lastName, email: x.email })
    }
      )
  });
  router.post('/details/:_id', getOneCandidate, function(req, res, next) {
    let endpoint = req.originalUrl.split('/')[1]
    // res.render(`${endpoint}`+`Details`, { person })
    // console.log("success");
    // services.getOne(endpoint, req.params._id)
    // .then(x => {x.candidates.map(req.body.selected)})
    // console.log(req.body.selected);
    // services.edit (endpoint,req.params._id, req.body)
    // .then(x=>console.log(x.status))
    // .catch(Error)
    res.redirect(`${endpoint}`);
  });
 
  module.exports = router;