var services = require('../services/services.js')
  
async function getCandidates(req, res, next){ 
  let endpoint = req.originalUrl.split('/')[req.originalUrl.split('/').length-1]
  console.log(endpoint)
  await services.getAll(`${endpoint}`)
   .then(x => {
       res.locals.persons = x
  })
  .catch(console.error(Error))
 return next()
}
  


module.exports = getCandidates;