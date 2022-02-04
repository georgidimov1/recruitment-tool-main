
const baseUrl = 'http://localhost:5000';
const fetch = require("node-fetch") ;
function createHeader(httpMethod, data) {
    const headers = {
        method: httpMethod,
        headers: {
             'Content-Type': 'application/json'
        }
    }
    if (httpMethod === 'POST' || httpMethod === 'PUT') {
        headers.body = JSON.stringify(data)
    }
    return headers;
}

function fetchData(endpoint, headers) {
    const url = `${baseUrl}/${endpoint}`;
    return fetch(url, headers)
        .then(console.error())
}
function get(endpoint) {
    const headers = createHeader('GET');
    return fetchData(endpoint, headers);
}
function post(endpoint, data) {
    const headers = createHeader('POST', data);
    return fetchData(endpoint, headers);
    
}
function put(endpoint, data) {
    const headers = createHeader('PUT', data);
    return fetchData(endpoint, headers);
}
function del(endpoint) {
    const headers = createHeader('DELETE');
    return fetchData(endpoint, headers);
}

let services = {
    postJobsData (endpoint, data){
        return post(endpoint, data)
    },
    getAll(endpoint){
        return get(endpoint)
        .then(x => x.json())
    },
    getOne(endpoint,_id){
        return get(`${endpoint}/${_id}`)
        .then(x => x.json())
    },
    delete(endpoint,_id){
        return del(`${endpoint}/${_id}`)
     },
    edit(endpoint, _id, data){
        return put(`${endpoint}/${_id}`, data)
        },
    userLogin(username, password){
        return post("user", "login", { username, password }, "Basic")
       
    },
    jobRegister(job, description){
        return post("jobs", { job, description })
          },
  

}

    

module.exports=services;