const { v4: uuidv4 } = require('uuid');
const fs = require ("fs");

// ROUTING

module.exports = function(app) {

    app.get('/api/notes', function (req, res) {
        fs.readFile("db/db.json", "utf8", function(error,data) {
          res.json(JSON.parse(data));
        });
        
      });


// Get new note to save on the request body, then add it to the db.json file, then return the new note to the client ui

      app.post("/api/notes", function(req, res) {
        var newNote = req.body;
        newNote.id = uuidv4();
          fs.readFile("db/db.json", "utf8", function(error,data) {
            var data = JSON.parse(data);
            data.push(newNote);
            fs.writeFile("db/db.json", JSON.stringify(data), function(error){
              if (error)
               throw error;
               console.log("Written Successfully");
            })
          });
          res.json(newNote);
    
        });

// Receive a query parameter containing the id of a note to delete. 
//  gives each note a unique id when it's saved. 
//  To delete a note, you'll need to read all notes from the db.json file,remove note of given id, then rewrite the notes list to the db.json file.


        app.delete("/api/notes/:id", function(req, res) {
            fs.readFile("db/db.json", "utf8", function(error, data) {
              let noteId = req.params.id;
              let noteData = JSON.parse(data);
              noteData = noteData.filter(function(note) {
                  if (noteId != note.id) {
                    return true;
                  } else {
                    return false;
                  };
              }); 
              fs.writeFile("db/db.json", JSON.stringify(noteData), function(error){
                if (error)
                throw error;
                res.end(console.log("Deleted Successfully"));
              })
            });
      
          });
      
      };