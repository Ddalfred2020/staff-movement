
const express = require("express")
const authrouter = require("./route/authrouter")
const mongoose = require("mongoose")
const morgan = require("morgan")
const STAFFMOVEMENT = require("./model/staffmovement")
const methodoverride = require("method-override")
const cookieParser = require("cookie-parser")
const { requireAuth, checkUser } = require("./middleware/authmiddleware")



const app = express()

const URI = "mongodb://dbalfred:Abrahim_2026@ac-3ht7xoi-shard-00-00.lhkdals.mongodb.net:27017,ac-3ht7xoi-shard-00-01.lhkdals.mongodb.net:27017,ac-3ht7xoi-shard-00-02.lhkdals.mongodb.net:27017/db_lockreport?ssl=true&replicaSet=atlas-11d0kq-shard-0&authSource=admin&appName=Cluster0"

mongoose.connect(URI)
.then((result)=>{
    console.log("connected to mongodb")
}) 
  .catch(err=>{
   console.log("error connecting to database:",err)
} )
app.listen(3000)

app.use(express.static("public"))
app.use(morgan("dev"))
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(methodoverride("_method"))
app.use(cookieParser())
app.use( checkUser)

    

app.set('view engine','ejs')
app.listen(3001)

app.get("/", (req,res)=>{
    res.render("index",{title:"This is the main page"})
})

app.use(authrouter)

app.get("/staff",requireAuth, (req,res)=>{
   STAFFMOVEMENT.find()
   .then((result)=>{
       res.render("staff",{result,title:"This is the movement page"})
   })
   .catch(err=>{
     console.log("could not load the page:", err)
   })
})

app.get("/staff/:id", (req,res)=>{
   const id = req.params.id
   STAFFMOVEMENT.findById(id)
   .then((result)=>{
    res.render("details",{staffresult:result,title:"This is the detail page"})
   })
   .catch(err=>{
    console.log("could not render the detail page:",err)
   })
})
app.put("/staff/:id", (req,res)=>{
   const id = req.params.id;
   STAFFMOVEMENT.findByIdAndUpdate(id,req.body,{new:true})
   .then((result)=>{
     res.redirect("/staff")
   })
   .catch(err=>{
    console.log("could not update staff movement log:",err)
   })
})

app.delete("/staff/:id", (req,res)=>{
   const id = req.params.id
   STAFFMOVEMENT.findByIdAndDelete(id)
   .then((response)=>{
      res.json({redirect:"/staff"})
})
.catch(err=>{
    console.log("could not delete the record:",err)
})
})

app.post("/staff",(req,res)=>{
      const {staffname, destination, purpose,
         department, authorization,
         possiblereturn, timeout, timein} = req.body

         const staffmovement = new STAFFMOVEMENT(req.body)
         staffmovement.save()
         .then((result)=>{
             res.redirect("/staff")
         })
         .catch(err=>{
                console.log("could not save the movement log:", err)
         }) 
})

app.get("/about", (req,res)=>{
    res.render("about",{title:"This is the about page"})
})

app.get("/createmovement", (req,res)=>{
    res.render("createmovement",{title:"This is the staff movement page"})
})

app.get("/update/:id", (req,res)=>{
    const id = req.params.id
    STAFFMOVEMENT.findById(id)
    .then((result)=>{
        res.render("update",{result, title:"This is the update page"})
    })
    .catch(err=>{
        console.log("could not display the update page:",err)
    })
})

app.get("/details", (req,res)=>{
    res.render("details",{title:"This is the detail page"})
})

app.use((req,res)=>{
  res.status(404).render("404",{title:"This is the 404 page"})

})
