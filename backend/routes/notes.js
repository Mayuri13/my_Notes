const express = require("express");
const router = express.Router();
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");
const fetchuser = require("../middleware/fetchuser");

//-------------------[Route:1] fetching notes : GET "/api/notes/fetchallnotes"  Login Required----------
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

//-------------------[Route:2] Add new note : POST "/api/notes/addnotes"  Login Required----------
router.post(
  "/addnotes",
  fetchuser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "description must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      //If there are any errors return bad request and the errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      //Destructuring title etc from the req.body
      const { title, description, tag } = req.body;

      //Saving notes to the database (there can bre multiple notes referencing to one user)
      const notes = new Notes({
        title,
        description,
        tag,
        user: req.id,
      });
      const savedNote = await notes.save();

      res.json(savedNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

//-------------------[Route:3] Update an existing note : PUT "/api/notes/addnotes"  Login Required----------
router.put("/updatenotes/:id", fetchuser, async (req, res) => {
  //Here take the id of the notes.. and not the user (in the url)
  try {
    //Destructuring title etc from the req.body
    const { title, description, tag } = req.body;
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }

    // Find the note to be updated and update it
    let notes = await Notes.findById(req.params.id);
    if (!notes) {
      return res.status(404).send("Not Found");
    }

    if (notes.user.toString() !== req.id) {
      return res.status(401).send("Not Allowed");
    }

    notes = await Notes.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json({ notes });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

//-------------------[Route:4] Delete an existing note : DELETE "/api/notes/deletenotes"  Login Required----------
router.delete("/deletenotes/:id", fetchuser, async (req, res) => {
  //Here take the id of the notes.. and not the user (in the url)
  try {
    // Find the note to be deleted and delete it
    let notes = await Notes.findById(req.params.id);
    if (!notes) {
      return res.status(404).send("Not Found");
    }

    if (notes.user.toString() !== req.id) {
      return res.status(401).send("Not Allowed");
    }

    notes = await Notes.findByIdAndDelete(req.params.id);
    res.json({ "Success" : "Note has been deleted", note: notes });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
