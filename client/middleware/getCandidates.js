var services = require('../services/services.js')
  
async function getCandidates(req, res, next){    
  await services.getAll('candidates')
   .then(x => {
       res.locals.persons = x
  })
  .catch(console.error(Error))
 return next()
}
  


module.exports = getCandidates;