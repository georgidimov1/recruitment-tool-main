var services = require('../services/services.js')
  
function getCandidates(req, res, next){    
    services.getAll('candidates')
    .then(x => {
       //console.log(x)
       res.locals.persons = x
   })
   .then(next())
}

module.exports = getCandidates;