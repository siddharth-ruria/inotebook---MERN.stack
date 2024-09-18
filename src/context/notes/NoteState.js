import React, { useState } from "react";
import NoteContext from "./noteContext";

const initialNotes = [
  {
    _id: "66e863ad07736kn48d7fbk4b6d1",
    user: "66e7a7fc41afb95c1a6c638e",
    title: "first note",
    description: "first description",
    tag: "notes",
    date: "2024-09-16T16:58:21.316Z",
    __v: 0,
  },
  {
    _id: "66e91832a9ad462kne2k1998048",
    user: "66e7a7fc41afb95c1a6c638e",
    title: "second note",
    description: "second description",
    tag: "notes",
    date: "2024-09-17T05:48:34.639Z",
    __v: 0,
  },
  {
    _id: "66e863ad07kn73648md7fb4b6d1",
    user: "66e7a7fc41afb95c1a6c638e",
    title: "third note",
    description: "third description",
    tag: "notes",
    date: "2024-09-16T16:58:21.316Z",
    __v: 0,
  },
  {
    _id: "66e91832a9ad4mbn62em21998048",
    user: "66e7a7fc41afb95c1a6c638e",
    title: "fourth note",
    description: "fourth description",
    tag: "notes",
    date: "2024-09-17T05:48:34.639Z",
    __v: 0,
  },
  {
    _id: "66e863ad07o73648md7fb4b6d1",
    user: "66e7a7fc41afb95c1a6c638e",
    title: "fifth note",
    description: "fifth description",
    tag: "notes",
    date: "2024-09-16T16:58:21.316Z",
    __v: 0,
  },
  {
    _id: "66e91832a9oad462mme21998048",
    user: "66e7a7fc41afb95c1a6c638e",
    title: "sixth note",
    description: "sixth description",
    tag: "notes",
    date: "2024-09-17T05:48:34.639Z",
    __v: 0,
  },
  {
    _id: "66e863ad077364ik8dm7fb4b6d1",
    user: "66e7a7fc41afb95c1a6c638e",
    title: "seventh note",
    description: "seventh description",
    tag: "notes",
    date: "2024-09-16T16:58:21.316Z",
    __v: 0,
  },
  {
    _id: "66e91832a9ad462eml21998048",
    user: "66e7a7fc41afb95c1a6c638e",
    title: "eigth note",
    description: "eigth description",
    tag: "notes",
    date: "2024-09-17T05:48:34.639Z",
    __v: 0,
  },
];

const NoteState = (props) => {
  const [notes, setNotes] = useState(initialNotes);

  // add a note
  const addNote = (title, description, tag) => {
    console.log("adding a new note");

    const note = {
      _id: "66e91832a9ad462e21998048",
      user: "66e7a7fc41afb95c1a6c638e",
      title: title,
      description: description,
      tag: tag,
      date: "2024-09-17T05:48:34.639Z",
      __v: 0,
    };
    setNotes(notes.concat(note));
  };

  // update a note
  const updateNote = (id, title, description, tag) => {};

  // delete a note
  const deleteNote = (id) => {
    console.log("deleting note with id: " + id);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  return (
    <NoteContext.Provider value={{ notes, addNote, updateNote, deleteNote }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
