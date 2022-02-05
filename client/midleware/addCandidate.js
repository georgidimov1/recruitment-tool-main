var services = require('../services/services.js')
async function addCandidates(req, res, next){
     await services.getOne('candidates', req.body.selected)
    .then(x => { 
        let endpoint = req.originalUrl.split('/')[1]
        // services.getOne(endpoint, req.params._id)  
        // .then(y => {
        //     y.candidates.push({"candidateId": x._id});
            //let data = {'candidates': y.candidates}
            let data = {"candidateId": x._id};
            let url = `${endpoint}/${req.params._id}/candidates`
            console.log(url)
            console.log(data)
                services.edit(url,'', data)
                .then(Z => console.log(Z))
    })
            // console.log(x)
    //}
    //)
    .then(next())
}


module.exports = addCandidates;