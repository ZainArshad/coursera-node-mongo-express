module.exports = (app) => {
    const notes = require('../controllers/note.controller.js');
    app.get('/',function(req,res)
    {
        res.sendFile('signup.html');
    })

    app.get('/login',function(req,res)
    {
        res.sendFile('/login.html');
    })
    // Create a new Note
    app.post('/login', notes.create);

    // Retrieve all Notes
    app.get('/notes', notes.findAll);
    
    // Retrieve a single Note with noteId
    app.post('/project', notes.findOne);

    // Update a Note with noteId
    app.post('/edit', notes.update);

    // Delete a Note with noteId
    app.delete('/notes/:noteId', notes.delete);

    app.get('/edit',function(req,res){
        console.log(__dirname);
        res.sendFile(path.join(__dirname+'/edit.html'));
      });

      app.get('/cpswd',function(req,res){
        console.log(__dirname);
        res.sendFile(path.join(__dirname+'/../../change_password.html'));
      });

      app.get('/password',function(req,res){
        console.log(__dirname);
        res.sendFile(path.join(__dirname+'/change_password.html'));
      });
}