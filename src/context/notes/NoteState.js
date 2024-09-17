import React, { useState } from "react";
import NoteContext from "./noteContext";

const initialNotes = [
  {
    _id: "66e863ad0773648d7fb4b6d1",
    user: "66e7a7fc41afb95c1a6c638e",
    title: "first note",
    description: "first first first",
    tag: "notes",
    date: "2024-09-16T16:58:21.316Z",
    __v: 0,
  },
  {
    _id: "66e91832a9ad462e21998048",
    user: "66e7a7fc41afb95c1a6c638e",
    title: "second note",
    description: "second second second",
    tag: "notes",
    date: "2024-09-17T05:48:34.639Z",
    __v: 0,
  },
];

const NoteState = (props) => {
  const [notes, setNotes] = useState(initialNotes);
  return (
    <NoteContext.Provider value={{ notes, setNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
