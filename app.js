
const express = require("express")
const authrouter = require("./route/authrouter")

const app = express()
app.use(express.static("public"))
    

app.set('view engine','ejs')
app.listen(3000)


app.get("/", (req,res)=>{
    res.render("index",{title:"This is the main page"})
})
app.use(authrouter)
app.get("/staff", (req,res)=>{
    res.render("staff",{title:"This is the movement page"})
})
app.get("/about", (req,res)=>{
    res.render("about",{title:"This is the about page"})
})
app.use((req,res)=>{
 res.status(404).render("404",{title:"This is the 404 page"})   
})