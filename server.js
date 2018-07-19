const path = require('path');

// ============ Express ============ 
const express = require('express');
const app = express();

// ============ Body Parser ============ 
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ============ Static Routes ============ 
app.use(express.static(path.join(__dirname, "angular-app/dist/angular-app")));

// ============ View Engine ============ 
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// ============ Session ============ 
const session = require('express-session');
app.set('trust proxy', 1) // trust first proxy
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 600000 }
}))

// ============ Flash ============ 
const flash = require('express-flash');
app.use(flash());

// ============ Mongoose ============ 
const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/cakes_db")



// Rating Schema
// const mongoose = require('mongoose');
const RatingSchema = new mongoose.Schema({
    rate: { 
        type: Number, 
        required: [true, "Rate must exist."]
    },
    comment: { 
        type: String, 
        required: [true, "Comment must exist."]
    },
}, { timestamps: true });
const Rating = mongoose.model('Rating', RatingSchema);


// Cake Schema
// const mongoose = require('mongoose');
const CakeSchema = new mongoose.Schema({
    baker: { 
        type: String, 
        required: [true, "Baker must exist."],
        minlength: [3, "Baker must be at least 3 characters long"]
    },
    description: { 
        type: String, 
        required: [true, "Description must exist."],
        minlength: [3, "Description must be at least 3 characters long"]
    },
    imgUrl: { 
        type: String, 
        required: [true, "Image URL must exist."],
        minlength: [3, "Image URL must be at least 3 characters long"]
    },
    ratings: { 
        type: [RatingSchema], 
        required: [true, "Image URL must exist."],
        minlength: [3, "Image URL must be at least 3 characters long"]
    },
}, { timestamps: true });
const Cake = mongoose.model('Note', CakeSchema);


// ============ Routes ============ 
app.get('/cakes', function (req, res) {
    Cake.find({}, function(err, cakes){
        res.json({status:true, payload:cakes});
    })
})
app.get('/cakes/:id', function (req, res) {
    Cake.findOne({_id: req.params.id}, function(err, cake){
        res.json({status:true, payload:cake});
    })
})
app.post('/cakes', function (req, res) {
    console.log("app.post('/cakes') req.body: ", req.body);
    const cakeInstance = new Cake();
    cakeInstance.baker = req.body.baker;
    cakeInstance.description = req.body.description;
    cakeInstance.imgUrl = req.body.imgUrl;
    console.log(cakeInstance);
    cakeInstance.save(function(err){
        if(err){ res.json({status:false, error:err}) }
        else { res.json({status:true}) }
    })
})

app.put('/cakes/:id/rating', function(req, res){
    console.log("app.put cake id rating");
    console.log('cake id', req.params.id)
    console.log('rating data', req.body)
    Cake.findOne({_id: req.params.id}, function(err, cake){        
        cake.ratings.push(req.body);
        cake.save(function(err){
            res.json(true);
        })
    })
})  
// ============ Server ============ 
app.listen(8000);
