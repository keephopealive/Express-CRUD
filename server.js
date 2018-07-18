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
mongoose.connect("mongodb://localhost/notes_db")
const NoteSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: [true, "Title must exist."],
        minlength: [3, "Title must be at least 3 characters long"]
    },
    description: { 
        type: String, 
        required: [true, "Description must exist."],
        minlength: [3, "Description must be at least 3 characters long"]
    },
}, { timestamps: true });
const Note = mongoose.model('Note', NoteSchema);


// ============ Routes ============ 

app.get('/notes', function (req, res) {
    Note.find({}, function(err, notes){
        res.json(notes);
    })
})
// app.get('/notes/new', function (req, res) {
//     res.render('notes-new');
// })
app.post('/notes', function (req, res) {
    console.log("app.post('/notes') req.body: ", req.body);
    const noteInstance = new Note();
    noteInstance.title = req.body.title;
    noteInstance.description= req.body.description;
    noteInstance.save(function(err, note){
        if (err) {
            res.json(false);
        } else {
            res.json(note);
        }  
    })
})

// app.get('/notes/:id/edit', function(req,res){
//     console.log("app.get('/notes/:id/edit') req.params.id: ", req.params.id);
//     Note.findOne({_id: req.params.id}, function(err, note){
//         res.render('notes-edit', { note: note });
//     })
// })

app.get('/notes/:id', function(req, res){
    Note.findOne({_id:req.params.id }, function(err, note){
        if(note){
            res.json(note);
        } else {
            res.json(null);
        }
    })
})

app.post('/notes/:id/update', function(req, res){
    console.log("app.post('/notes/:id/update'), req.params.id: ", req.params.id, " req.body ", req.body);
    Note.findOne({_id: req.params.id}, function(err, note){
        note.title = req.body.title;
        note.description = req.body.description;
        note.save(function(err){
            if(err){
                // if(err.errors.title){
                    // req.flash('create_error_title', err.errors.title.message)
                // }
                // if(err.errors.description){
                    // req.flash('create_error_description', err.errors.description.message)
                // }
                // res.redirect('/notes/'+req.params.id+'/edit')
                res.json(false)
            } else {
                // res.redirect('/notes/'+req.params.id);
                res.json(note)
            }
        })
    })
})

app.delete("/notes/:id", function(req, res){
    console.log("app.get('/notes/:id/delete'), id: ", req.params.id);
    Note.findOneAndDelete({_id: req.params.id}, function(query) {
        res.json(true);
    })
})




// ============ Server ============ 
app.listen(8000);
