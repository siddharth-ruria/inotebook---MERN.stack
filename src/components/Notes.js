import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";
import NoteItem from "./NoteItem";
import { v4 as uuidv4 } from "uuid";

const Notes = () => {
  const context = useContext(noteContext);
  const { notes, setNotes } = context;
  return (
    <div className="row my-4">
      <h1>your notes</h1>
      {notes.map((note) => {
        return <NoteItem key={uuidv4()} note={note} />;
      })}
    </div>
  );
};

export default Notes;
