const express = require('express');
const hbs = require('hbs');
const fs = require('fs')

const ipdata = require('./ipdata.js');

const port = process.env.PORT || 3000;

var app = express();
hbs.registerPartials(__dirname+ '/views/partials')
hbs.registerHelper('getCurrentYear', ()=>{
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text)=>{
  return text.toUpperCase();
});
app.set('view engine', 'hbs');

app.use((req, res, next)=>{ // middleware function

  next();
});


app.get('/', (req, res)=>{

  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url} \n ip: ${req.ip}`;
  var data = req.headers['user-agent'];
  var log2 = `ip: ${req.ip}`

  ipdata.ipData(req.ip,(errorMessage,results)=>{
    if(errorMessage){
      console.log(errorMessage);
    }else{
      console.log(log + '\n' + data + '\n' + results.as + " | " + results.city + '\n');
    }
    console.log("=============================");
  });



  res.render('home.hbs',{
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to my website',
  })

});

app.get('/about', (req,res)=>{
  res.render('about.hbs',{
    pageTitle: 'About Page',
  });
});

app.get('/projects', (req,res)=>{
  res.render('projects.hbs',{
    pageTitle: 'My projects',
  });
});

app.get('/bad', (req,res)=>{
  res.send({
    errorMessage:"Unable to handle request"
  });
});


app.listen(port, () =>{
  console.log('Server is up on port '+port)
});
