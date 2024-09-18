import React, { useContext, useEffect } from "react";
import NoteItem from "./NoteItem";
import noteContext from "../context/notes/noteContext";
import { v4 as uuidv4 } from "uuid";
import AddNote from "./AddNote";

const Notes = () => {
  const context = useContext(noteContext);
  const { notes, getAllNotes } = context;
  useEffect(() => {
    getAllNotes();
  }, []);
  return (
    <>
      <AddNote />
      <div className="row my-4">
        <h1>your notes</h1>
        {notes.map((note) => {
          return <NoteItem key={uuidv4()} note={note} />;
        })}
      </div>
    </>
  );
};

export default Notes;
