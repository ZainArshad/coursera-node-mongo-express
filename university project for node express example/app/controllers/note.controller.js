const Note = require('../models/note.model.js');

// Create and Save a new Note
exports.create = (req, res) => {
    // Validate request
    // if(!req.body.content) {
    //     return res.status(400).send({
    //         message: "Note content can not be empty"
    //     });
    // }

    // Create a Note
    const note = new Note({
        'name': req.body.name || "Unnamed Note", 
        'password': req.body.pswd,
        'email': req.body.oldpassword,
        'dob':req.body.dt
    });

    // Save Note in the database
    note.save()
    .then(data => {
        //res.send(data);
        res.sendFile('/Users/z/Documents/node-easy-notes-app-master/login.html');//error baad main theek karna
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Note."
        });
    });
};

// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
    Note.find()
    .then(notes => {
        res.send(notes);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
};

// Find a single note with a noteId
exports.findOne = (req, res) => {
    Note.findOne({'email':req.body.oldpassword})
  .then(user=>{
    if(!user){return res.status(404).end()}
    n=req.body.name;
    e=req.body.oldpassword;
    d=req.body.dt;
    pass=req.body.pswd;
    console.log("one");
     res.sendFile('/Users/z/Documents/node-easy-notes-app-master/project.html');
     res.render('/Users/z/Documents/node-easy-notes-app-master/project.html', req.body.name);
     //res.json(req.body.name);
     //res.render("/Users/z/Documents/node-easy-notes-app-master/project.html",{'<h1>req.body.name</h1>'},function(err))
    //res.redirect('/Users/z/Documents/node-easy-notes-app-master/project.html');
    // res.send('<h1>"n"</h1>');
    // res.render('index', function (err, html) {
    //    res.send(html)
    //  })
      
     
  
  })
};

// Update a note identified by the noteId in the request
exports.update = (req, res) => {
    // Validate Request
    // if(!req.body.content) {
    //     return res.status(400).send({
    //         message: "Note content can not be empty"
    //     });
    // }
   console.log("aur chal rahe");
    // Find note and update it with the request body
   // Note.set('useFindAndModify', false);
   console.log(req.body.oldpassword);
    Note.findOneAndUpdate({'email':req.body.oldpassword},{ $set:{
        'name': req.body.name || "Unnamed Note"
    }}, {new: true})
    .then(note => {
        if(!note) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });
        }
        console.log("note hai");
        res.send(note);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });                
        }
        return res.status(500).send({
            message: "Error updating note with id " + req.params.noteId
        });
    });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    Note.findByIdAndRemove(req.params.noteId)
    .then(note => {
        if(!note) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });
        }
        res.send({message: "Note deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });                
        }
        return res.status(500).send({
            message: "Could not delete note with id " + req.params.noteId
        });
    });
};
