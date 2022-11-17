//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");


const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Johannes Kordina <br> Baumschulenstraße 67 <br> 12437 Berlin <br> Johannes.kordina@gmail.com";


const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


// Database Cloud
const database = module.export = () =>{
  const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
  try{
    mongoose.connect("mongodb+srv://mimo:PW@cluster0.h92lk4g.mongodb.net/mongodb?retryWrites=true&w=majority")
    console.log("Connection to MongoDB was successfully established");
  }catch (error){
    console.log("Error no connection to DB")
  }
}

const postSchema = {
  title: String,
  content: String
};

const Post = mongoose.model("Post", postSchema);

app.get('/', (req, res) => {
  Post.find({}, function (err, posts) {
    res.render("home", {
      startingContent: homeStartingContent,
      posts: posts
      })
    })
  });


app.get("/About", (req, res) => {
  res.render("about", {
    aboutText: aboutContent,
  });
});

app.get("/compose", (req, res) => {
  res.render("compose");

});


app.post("/compose", (req, res) => {
  
  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody,
  });

  post.save(function(err){
    if(!err){
    res.redirect("/");
   } 
  });
})

app.get("/Contact", (req, res) => {
  res.render("contact", {
    contactText: contactContent,
  });  
});








app.get("/posts/:postId", (req, res) => {
    
  const requestedPostId = req.params.postId; 

    Post.findOne({_id:requestedPostId}, function(err, post){
      res.render("post", {
        title: post.title,
        content: post.content
    });
  });
});


database(),

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
