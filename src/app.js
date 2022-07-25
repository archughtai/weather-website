const path = require("path");
const express = require("express");
const { response } = require("express");
const { isAbsolute } = require("path");
const hbs= require("hbs")
const getLatLong = require("./utils/getlatlong");
const forecast = require("./utils/forecast");

//console.log(__dirname);
//console.log(path.join(__dirname, "../public"));

const app = express();
const port= process.env.PORT || 3000

//define paths for express config
const publicDirectoryPath = path.join(__dirname, "../public")
const viewPath = path.join(__dirname, "../templates/views")
const partialsPath= path.join(__dirname,"../templates/partials")
//console.log(publicDirectoryPath)  

//setup handlebars engine and views location
app.set("view engine", "hbs");
app.set('views', viewPath)
hbs.registerPartials(partialsPath, function (err) {});


//setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", function (req, res) {
  res.render("index", {
    title: "Weather",
    name: "Ali",
  });
});

app.get("/about", function (req, res) {
  res.render("about", {
    title: "About Me",
    name: "Ali",
  });
});

app.get("/help", function (req, res) {
  res.render("help.hbs", {
    helptext: "We are here to help  you",
    title:'Help',
    name: "Ali"
  });
});

// app.get('/help', function (req, res) {
//   res.send({
//       name: 'Ali',
//       age: 33

//   })
// })
//   app.get('/about', function (req, res) {
//     res.send('<h1>About Us</h1>')
//   })

app.get("/products",function(req,res){
  if(!req.query.search){
    return res.send({error: "you must provide a search term"})
  }
  res.send({products:[]})
  console.log(req.query)

})


app.get("/weather", function (req, res) {
  console.log(req.query.address)
  if(!req.query.address){
    return res.send("no address entered")
  }
  getLatLong(req.query.address, (error, {latitude, longitude, location}={}) => {

    
    if(error)
       {return res.send({error})}
       forecast(latitude, longitude,  function callback(error, forecastData) {
             if (error){ 
               return res.send({error}) 
                }
            

              res.send({
                forecast:forecastData,
                location,
                Address: req.query.address,

            });
             });
           });
    
});

app.get("/help/*",(req,res)=>{
  res.render("404-error", {title: "404", name: "Ali", errortype: "Help article not found"})
})

app.get("*", (req,res)=>{
  res.render("404-error.hbs",{title:"404", name: "Ali", errortype: "404 error"})
})

app.listen(port, () => {
  console.log("server is running on port "+port);
});
