const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const Notes = require("../models/Notes");
const fetchUser = require("../middleware/fetchUser");

// ------------------------------- ROUTE 1 -------------------------------

// route (/api/auth/fetchAllNotes)

// GET -> get all the notes of the user

router.get("/fetchAllNotes", fetchUser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("internal server error :/");
  }
});

// ------------------------------- ROUTE 2 -------------------------------

// route (/api/auth/addNote)

// POST -> add a new note

router.get(
  "/addNote",
  fetchUser,
  [
    body("title", "enter a valid title").isLength({ min: 3 }),
    body("description", "description must be of 7 chars minimum").isLength({
      min: 7,
    }),
  ],
  async (req, res) => {
    // checks for the validation of the note written
    try {
      const { title, description, tag } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
        });
      }
      const note = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });

      // saves the note in the db using .save() if everything checks out
      const savedNote = await note.save();
      res.json(savedNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("internal server error :/");
    }
  }
);

// ------------------------------- ROUTE 3 -------------------------------

// route (/api/auth/updateNote/:id)

// PUT -> update details of a note

router.put(
  "/updateNote/:id",
  fetchUser,
  [
    body("title", "enter a valid title").isLength({ min: 3 }),
    body("description", "description must be of 7 chars minimum").isLength({
      min: 7,
    }),
  ],
  async (req, res) => {
    const { title, description, tag } = req.body;

    // create a new note object
    const newNote = {};
    if (title) newNote.title = title;
    if (description) newNote.description = description;
    if (tag) newNote.tag = tag;

    // find the note and update it
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send("note not found");
    }
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("not allowed");
    }
    note = await Notes.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json(note);
  }
);

module.exports = router;
