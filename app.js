
const express = require("express")
const authrouter = require("./route/authrouter")
const mongoose = require("mongoose")
const morgan = require("morgan")
const STAFFMOVEMENT = require("./model/staffmovement")

const app = express()

const URI = "mongodb://dbalfred:Abrahim_2026@ac-3ht7xoi-shard-00-00.lhkdals.mongodb.net:27017,ac-3ht7xoi-shard-00-01.lhkdals.mongodb.net:27017,ac-3ht7xoi-shard-00-02.lhkdals.mongodb.net:27017/db_lockreport?ssl=true&replicaSet=atlas-11d0kq-shard-0&authSource=admin&appName=Cluster0"

mongoose.connect(URI)
.then(()=>{
    console.log("connected to database") 
})   
  .catch(err=>{
   console.log("error connecting to database:",err)
} )


app.use(express.static("public"))
app.use(morgan("dev"))
app.use(express.urlencoded({extended:true}))

    

app.set('view engine','ejs')
app.listen(3000)

app.get("/", (req,res)=>{
    res.render("index",{title:"This is the main page"})
})
app.use(authrouter)
app.get("/staff", (req,res)=>{

    const {name, destination, purpose,
         department, authorization,
         possiblereturn, timeout, timein} = req.body
         const staffmovement = new STAFFMOVEMENT({name, destination,
             purpose,
         department, authorization,
         possiblereturn, timeout, timein})
         staffmovemnt.save()
         .then((result)=>{
             res.redirect("staff",{result,title:"This is the movement page"})
         })
         .catch(err=>{
                console.log("could not save the movement log:", err)
         })
   STAFFMOVEMENT.find()
   .then((result)=>{
       res.render("staff",{result,title:"This is the movement page"})
   })
   .catch(err=>{
     console.log("could not load the page:", err)
   })
   

})
app.get("/about", (req,res)=>{
    res.render("about",{title:"This is the about page"})
})
app.get("/createmovement", (req,res)=>{
    res.render("createmovement",{title:"This is the staff movement page"})
})
app.get("/update", (req,res)=>{
    res.render("update",{title:"This is the update page"})
})
app.get("/details", (req,res)=>{
    res.render("details",{title:"This is the detail page"})
})
app.use((req,res)=>{
 res.status(404).render("404",{title:"This is the 404 page"})   
})