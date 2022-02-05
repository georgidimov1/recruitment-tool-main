var services = require('../services/services.js')
  
async function getCandidates(req, res, next){    
    await services.getAll('candidates')
    .then(x => {
       //console.log(x)
       res.locals.persons = x
   })
   .then(next())
}

module.exports = getCandidates;