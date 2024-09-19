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

    const note = await response.json();
    setNotes(notes.concat(note));
  };

  // ----------------------------------- update a note -----------------------------------
  const updateNote = async (id, title, description, tag) => {
    // api call
    const response = await fetch(`${host}/api/notes/updateNote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZlN2E3ZmM0MWFmYjk1YzFhNmM2MzhlIn0sImlhdCI6MTcyNjQ4MDA5Nn0.-UZ4AdZBxRMg68IRF0hseDM5rgkDWtcLguv5gPVeQDc",
      },
      body: JSON.stringify({ title, description, tag }),
    });

    const json = await response.json();
    console.log(json);

    getAllNotes();

    // logic to edit in client
    // let newNotes = JSON.parse(JSON.stringify(notes));
    // for (let index = 0; index < newNotes.length; index++) {
    //   const element = newNotes[index];
    //   if (element._id === id) {
    //     newNotes[index].title = title;
    //     newNotes[index].description = description;
    //     newNotes[index].tag = tag;
    //     break;
    //   }
    // }
    // setNotes(newNotes);
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
