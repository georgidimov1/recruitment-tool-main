var express = require('express');
const getCandidates = require('../middleware/getCandidates.js');
const addCandidate = require('../middleware/addCandidate.js')
var router = express.Router();
var services = require('../services/services.js')


router.get('/', function(req, res, next) {
  let endpoint = req.originalUrl.split('/')[1]
    services.getAll(endpoint)
    .then(x => {
      console.log(x)
      res.render(endpoint, { title: endpoint , data: x})
    })
  });

  router.get('/create', function(req, res, next) {
    let endpoint = req.originalUrl.split('/')[1]
    res.render(`${endpoint}`+'Create', {action:`create`});
  });
router.post('/create', function(req, res, next) {
    let endpoint = req.originalUrl.split('/')[1]
    services.post(endpoint, req.body)
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
    /* render update form for single entry jobs or candidates */
router.get('/update/:_id', function(req, res, next) {
    let endpoint = req.originalUrl.split('/')[1]
    services.getOne(endpoint, req.params._id)
    .then(x => res.render(`${endpoint}`+'Create', { action: x._id, title: x.title , description: x.description, firstName: x.firstName, lastName: x.lastName, email: x.email }))
   });
    /* update single entry jobs or candidates */
router.post('/update/:_id', function(req, res, next) {
    let endpoint = req.originalUrl.split('/')[1]
    services.edit (endpoint,req.params._id, req.body)
    .then(x=>console.log(x.status))
    .catch(Error)
    res.redirect(`/${endpoint}`);
  });
router.get('/:_id/candidates', getCandidates, async function(req, res, next) {
    let endpoint = req.originalUrl.split('/')[1]
    await services.getOne(endpoint, req.params._id)
    .then(x => res.render(`${endpoint}`+`Details`, 
    { action: `candidates`, 
    title: x.title , 
    description: x.description, 
    candidate: x.candidates, 
    firstName: x.firstName, 
    lastName: x.lastName, 
    email: x.email}
    )
    )
  });
router.post('/:_id/candidates',addCandidate, function(req, res, next) {
    let endpoint = req.originalUrl.split('/')[1]
    console.log(req.baseUrl)
    res.redirect(`/${endpoint}/${req.params._id}/candidates`);
  });

router.get('/:_id', function(req, res, next) {
    let endpoint = req.originalUrl.split('/')[1]
      services.getOne(endpoint, req.params._id)
      .then(x => res.render(`${endpoint}Details`, { action: x._id, title: x.title , description: x.description, firstName: x.firstName, lastName: x.lastName, email: x.email }))
   });
/* delete jobs candidate */
router.get('/:_jid/candidates/:_cid', function(req, res, next) {
      let endpoint = req.originalUrl.split('/')[1]
          services.delete (endpoint, `${req.params._jid}/candidates/${req.params._cid}`)
          .then(x=>console.log(x.status))
          .catch(console.error(Error))
      res.redirect(`/${endpoint}/${req.params._jid}/candidates`);
  });
  router.get('/:_jid/interviews/:_cid', function(req, res, next) {
    let endpoint = req.originalUrl.split('/')[1]
    let dataInterviews = {
      "jobId": req.params._jid,
      "candidateId": req.params._cid,
      "slot": 1
    }
            services.post('interviews', dataInterviews)
            .then(x=> {if(x.status==200){
              services.delete (endpoint, `${req.params._jid}/candidates/${req.params._cid}`)
              .then(x=>console.log(x.status))
              .catch(console.error(Error))
            }})
            .catch(Error)
  /
    res.redirect(`/${endpoint}/${req.params._jid}/candidates`);
}); 
  module.exports = router;