var services = require('../services/services.js')
function getOneCandidates(req, res, next){
     services.getOne('candidates', req.body.selected)
    .then(x => {   
             console.log(x)
    }
    )
    .then(next())
}


module.exports = getOneCandidates;