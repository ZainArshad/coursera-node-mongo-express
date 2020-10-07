const mongoose = require('mongoose');

const NoteSchema = mongoose.Schema({
    name:String,
    password:String,
    email:{type:String,required:true, unique:true},
    dob:String
});

module.exports = mongoose.model('Note', NoteSchema);