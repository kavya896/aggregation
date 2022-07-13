const express = require("express")
const mongoose  = require("mongoose")
const app = express()
const moviesList = require("./moviesList")
const List = require("./model")
const generateToken = require("./generateToken") 
const protect = require("./protect")

const db = "mongodb+srv://kavyareddy:kavyareddy@cluster0.msabz.mongodb.net/?retryWrites=true&w=majority"
app.use(express.json())

mongoose.connect(db).then(()=>{
    console.log("connection successful")
})


//you can test all these api's using postman using "http://localhost:5000/" to get and post movies list && to get by genres use "http://localhost:5000/byGenres"

//to post movie db.json into mongodb by post api
app.post("/",async(req,res)=>{
    try{
        const list = new List({
            list:moviesList,
            token:generateToken()
        })
        const movieList = await list.save()
        res.json({
            _id:movieList._id,
            list:movieList.list,
            token:movieList.token
        })  
         
    }catch(err){
        console.log(err)
    }
})

//to fetch the movies db.json data 
app.get("/",protect,async(req,res)=>{
    try{
        if(protect){
            const getList = await List.find({})
            res.json({getList})
        }
        
    }catch(err){
        console.log(err)
    }
})

//to fetch the movies by genres
app.get("/byGenres",async(req,res)=>{
    try{
        const result = await List.aggregate([
            
            
            {$unwind:"$list"},
            
            {$unwind:"$list.genres"},
            {$group:{
                _id:"$list.genres",
                movies:{$push:{
                    director:"$list.director",
                    imdb_rating:"$list.imdb_rating",
                    length:"$list.length",
                    poster:"$list.poster",
                    title:"$list.title"
                }}
            }}
            
            
        ])
        res.json({result})    
    }catch(err){
        console.log(err)
    }
})

app.listen(5000,(req,res)=>{
    console.log("listening at port no 5000")
})
