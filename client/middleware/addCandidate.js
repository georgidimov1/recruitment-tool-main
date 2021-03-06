var services = require('../services/services.js')
async function addCandidates(req, res, next){
     await services.getOne('candidates', req.body.selected)
    .then(x => { 
        let endpoint = req.originalUrl.split('/')[1]
        let url = `${endpoint}/${req.params._id}/candidates`
        let data = {
            "candidateId": x._id
          }
                services.addCandidate(url, data)
                .then(Z =>{
                    if(Z.status!==200){throw(Error)}
                } )
                .catch(Error)
    })
    .then(next())
    .catch(Error)
}


module.exports = addCandidates;