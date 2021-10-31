
// return a callback on Promise in order to scrap the web due to the querry first
// then continue

const GoogleSearch = require('../API/API.js');// serpapi , deployment on post method 
                                                //to pass query data

module.exports = function Update(q,callback){


    let SearchPromise =new Promise((resolve,reject)=>{

        GoogleSearch.json(q,(result)=>{
            
            resolve(result);
        })
    
    })

    callback(SearchPromise);
}