var services = require('../services/services.js')
  
function getCandidates(req, res, next){    
   services.getAll('candidates')
   .then(x => {
       console.log("midleware")
       res.locals.persons = x
  })
  .catch(console.error(Error))
  next()
   
}
  


module.exports = getCandidates;