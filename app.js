require('dotenv').config();
let express = require('express');
let app = express();
let PORT = process.env.PORT || 3000;
let path = require("path");
let mongoose = require("mongoose");
let Post = require("./models/postModel");
let methodOverride = require("method-override");


// let db = "mongodb+srv://drapakayura:rqtrsFj4h4ZOyDax@cluster0.n6mbsmt.mongodb.net/Node-blog";




app.set("views", path.join(__dirname, "views"));
app.set('view engine', 'ejs');

app.use(express.static('public'));

app.use(express.urlencoded({extended: false}));
app.use(methodOverride("_method"));

app.get('/', (req, res) =>{
    res.render("index", {title: "Main Page"});
});


app.get('/add-post', (req, res) =>{
    res.render("add-post", {title: "Add Post"});
});


app.post('/add-post', (req, res) =>{
    let { title, author } = req.body;
    let post = new Post({ title, author});
    post
        .save()
        .then(() => res.redirect("/posts"))
        .catch((error) => {
            console.log(error);
            res.render("error");
        });
});


app.get("/posts", (req, res) =>{
    Post.find().sort({ createdAt: -1 })
        .then((posts) => res.render("posts", { title:
            "Posts", posts }))
        .catch((error) => {
            console.log(error);
            res.render("error");
        });
});

app.get("/edit-post/:id", (req, res) =>{
    let id = req.params.id;
    Post.findById(id)
        .then((post) =>
            res.render("edit-post", { 
            title: post.title, id: post._id, post})
            )
        .catch((error) => {
            console.log(error);
            res.render("error");
        });
});

app.put("/edit-post/:id", (req, res) =>{
    let id = req.params.id;
    const { title, author } = req.body;
    Post.findByIdAndUpdate(id, { title, author })
        .then(() => res.redirect(`/posts`))
        .catch((error) => {
            console.log(error);
            res.render(createPath("error"));
        });
});

app.delete("/posts/:id", (req, res) =>{
    let id = req.params.id;
    Post.findByIdAndDelete(id)
        .then((posts) => res.render("posts", {title: "Posts", posts}))
        .catch((error) => {
            console.log(error);
            res.render("error");
        });
});



async function start(){
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log(`Connection to MongoDb is success!`);
        app.listen(PORT, ()=>{
            console.log(`Server is listening PORT ${PORT}...`);
        });
    } catch (error){
        console.log(" \n Connection error!!! \n\n", error);
    }
};

// mongoose.set('strictQuery', false);
// const connectDB = async () => {
//   try {
//     const conn = await mongoose.connect(process.env.MONGO_URI);
//     console.log(`MongoDB Connected: ${conn.connection.host}`);
//   } catch (error) {
//     console.log(error);
//     process.exit(1);
//   }
// }

start();