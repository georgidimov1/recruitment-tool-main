var services = require('../services/services.js')
async function addCandidates(req, res, next){
     await services.getOne('candidates', req.body.selected)
    .then(x => { 
        let endpoint = req.originalUrl.split('/')[1]
            let data = {'candidateId': x};
            let url = `${endpoint}/${req.params._id}/candidates`
            console.log(url)
            console.log(data)
                services.edit(url,'', data)
                .then(Z => console.log(Z))
    })
    .then(next())
}


module.exports = addCandidates;