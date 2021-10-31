const express = require('express');
const app = express();
const PORT = 3000;


app.use(express.urlencoded({ extended: false }))
app.use(express.json());
app.set('view engine','ejs'); // for rendering ejs templates
app.listen(PORT);
const fs = require('fs');


let UpdatePromise = require('./Promise/Update.js');


// init default query params
let queryParams = {
	q: "default",
    location: "Austin, Texas, United States",
    hl: "en",
    gl: "us",
	engine: "google",
    google_domain: "google.com",
}

let search = null; // set search global for testing reasons








let HomePage = './HTML/Home.html';
let MainPage = './HTML/Mainpage.html';






app.get('/',(req,res)=>{

    fs.readFile(MainPage,(err,data)=>{
        res.writeHead(200,{'Content-Type':'text/html'});
        res.write(data);
        res.end();
   });
})




app.get('/home',(req,res)=>{

        fs.readFile(HomePage,(err,data)=>{
            res.writeHead(200,{'Content-Type':'text/html'});
            res.write(data);
            res.end();
       });
})


app.get('/news',async(req,res)=>{

    queryParams.q='Latest News';

    UpdatePromise(queryParams,(SearchPromise)=>{
        SearchPromise.then((result)=>{
            //console.log(result.top_stories)
            res.render('news',{news:result.top_stories});
           

        })/*.then(()=>{

            res.send('web scrapping complete');
        });*/

    })


})
app.post('/home',(req,res)=>{


    search = []
    console.log(req.body.query)// reads the query
    queryParams.q=req.body.query; // pass post data

    UpdatePromise(queryParams,(SearchPromise)=>{
        SearchPromise.then((result)=>{
            res.render('HomeSearch',{news:result.organic_results,top_news:result.top_stories});

        })/*.then(()=>{
            res.send('Web scrapping complete!');
            res.end();


        });*/

    })
   
    
})





