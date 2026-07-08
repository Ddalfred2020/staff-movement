require("dotenv").config();


const express = require("express")
const authrouter = require("./route/authrouter")
const mongoose = require("mongoose")
const morgan = require("morgan")
const STAFFMOVEMENT = require("./model/staffmovement")
const methodoverride = require("method-override")
const cookieParser = require("cookie-parser")
const { requireAuth, checkUser } = require("./middleware/authmiddleware")
const NOTIFICATION = require("./model/notification")

const transporter = require("./config/mailer")
const sendEmail = require("./config/send")




const app = express()
app.set("trust proxy", 1)

const URI = process.env.MONGO_URI

mongoose.connect(process.env.MONGO_URI)
.then((result)=>{
    console.log("connected to mongodb")
}) 
  .catch(err=>{
   console.log("error connecting to database:",err)
} )

app.listen(process.env.PORT || 3001)
app.set('view engine','ejs')

app.use(express.static("public"))
app.use(morgan("dev"))
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(methodoverride("_method"))
app.use(cookieParser())
app.use( checkUser)

    


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
   STAFFMOVEMENT.findByIdAndUpdate(id,req.body,{ new:true})
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
app.post("/staff",  async (req, res) => {
     const {staffname, destination, purpose,
         department, authorization,
         possiblereturn, timeout, timein} = req.body

    
        const staffmovement = new STAFFMOVEMENT(req.body)

        await staffmovement.save();

try {

  await sendEmail(

"osagiedayo98@gmail.com",

"Staff Movement log Registration",

`
<h2>Staff Name:  ${staffmovement.staffname}</h2>
<h2>Destination:  ${staffmovement.destination}</h2>
<h2>Purpose:  ${staffmovement.purpose}</h2>
<h2>Department:  ${staffmovement.department}</h2>
<h2>Timeout:  ${staffmovement.timeout}</h2>

<p>Your movement log registration was successful.</p>

`
); 


} catch (emailError) {

    console.error("Email failed:", emailError.message);

    // Don't stop the request
}

await NOTIFICATION.create({
    message: `${staffmovement.staffname} submitted a movement log for ${staffmovement.destination} at ${staffmovement.timeout}`
});

res.redirect("/staff");
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
app.get("/admin", async (req,res)=>{
    const notifications = await NOTIFICATION.find()
        .sort({ createdAt: -1 })
    res.render("admin",{notifications,title:"This is the admin page"})
})


app.get("/details", (req,res)=>{
    res.render("details",{title:"This is the detail page"})
})

app.use((req,res)=>{
  res.status(404).render("404",{title:"This is the 404 page"})
})


