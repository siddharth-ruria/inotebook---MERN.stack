import React, { useState } from "react";
import NoteContext from "./noteContext";

const initialNotes = [];

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const [notes, setNotes] = useState(initialNotes);

  // ----------------------------------- get all notes -----------------------------------

  const getAllNotes = async () => {
    // api call
    const response = await fetch(`${host}/api/notes/fetchAllNotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZlN2E3ZmM0MWFmYjk1YzFhNmM2MzhlIn0sImlhdCI6MTcyNjQ4MDA5Nn0.-UZ4AdZBxRMg68IRF0hseDM5rgkDWtcLguv5gPVeQDc",
      },
    });
    const json = await response.json();
    console.log(json);
    setNotes(json);
  };

  // ----------------------------------- add a note -----------------------------------
  const addNote = async (title, description, tag) => {
    // api call
    const response = await fetch(`${host}/api/notes/addNote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZlN2E3ZmM0MWFmYjk1YzFhNmM2MzhlIn0sImlhdCI6MTcyNjQ4MDA5Nn0.-UZ4AdZBxRMg68IRF0hseDM5rgkDWtcLguv5gPVeQDc",
      },
      body: JSON.stringify({ title, description, tag }),
    });

    console.log("adding a new note");
    const note = await response.json();
    setNotes(notes.concat(note));

    // const note = {
    //   _id: uuidv4(),
    //   user: "66e7a7fc41afb95c1a6c638e",
    //   title: title,
    //   description: description,
    //   tag: tag,
    //   date: "2024-09-17T05:48:34.639Z",
    //   __v: 0,
    // };
  };

  // ----------------------------------- update a note -----------------------------------
  const updateNote = async (id, title, description, tag) => {
    // api call
    const response = await fetch(`${host}/api/notes/updateNote/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZlN2E3ZmM0MWFmYjk1YzFhNmM2MzhlIn0sImlhdCI6MTcyNjQ4MDA5Nn0.-UZ4AdZBxRMg68IRF0hseDM5rgkDWtcLguv5gPVeQDc",
      },
      body: JSON.stringify({ title, description, tag }),
    });

    // logic to edit in client
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
    }
  };

  // ----------------------------------- delete a note -----------------------------------
  const deleteNote = async (id) => {
    const response = await fetch(`${host}/api/notes/deleteNote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZlN2E3ZmM0MWFmYjk1YzFhNmM2MzhlIn0sImlhdCI6MTcyNjQ4MDA5Nn0.-UZ4AdZBxRMg68IRF0hseDM5rgkDWtcLguv5gPVeQDc",
      },
    });
    const json = await response.json();
    console.log(json);
    console.log("deleting note with id: " + id);

    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  return (
    <NoteContext.Provider
      value={{ notes, getAllNotes, addNote, updateNote, deleteNote }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
