import React, { useState } from "react";
import NoteContext from "./noteContext";

const initialNotes = [
  {
    _id: "66e863ad0773648d7fb4b6d1",
    user: "66e7a7fc41afb95c1a6c638e",
    title: "first note",
    description: "first description",
    tag: "notes",
    date: "2024-09-16T16:58:21.316Z",
    __v: 0,
  },
  {
    _id: "66e91832a9ad462e21998048",
    user: "66e7a7fc41afb95c1a6c638e",
    title: "second note",
    description: "second description",
    tag: "notes",
    date: "2024-09-17T05:48:34.639Z",
    __v: 0,
  },
  {
    _id: "66e863ad0773648d7fb4b6d1",
    user: "66e7a7fc41afb95c1a6c638e",
    title: "third note",
    description: "third description",
    tag: "notes",
    date: "2024-09-16T16:58:21.316Z",
    __v: 0,
  },
  {
    _id: "66e91832a9ad462e21998048",
    user: "66e7a7fc41afb95c1a6c638e",
    title: "fourth note",
    description: "fourth description",
    tag: "notes",
    date: "2024-09-17T05:48:34.639Z",
    __v: 0,
  },
  {
    _id: "66e863ad0773648d7fb4b6d1",
    user: "66e7a7fc41afb95c1a6c638e",
    title: "fifth note",
    description: "fifth description",
    tag: "notes",
    date: "2024-09-16T16:58:21.316Z",
    __v: 0,
  },
  {
    _id: "66e91832a9ad462e21998048",
    user: "66e7a7fc41afb95c1a6c638e",
    title: "sixth note",
    description: "sixth description",
    tag: "notes",
    date: "2024-09-17T05:48:34.639Z",
    __v: 0,
  },
  {
    _id: "66e863ad0773648d7fb4b6d1",
    user: "66e7a7fc41afb95c1a6c638e",
    title: "seventh note",
    description: "seventh description",
    tag: "notes",
    date: "2024-09-16T16:58:21.316Z",
    __v: 0,
  },
  {
    _id: "66e91832a9ad462e21998048",
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
  return (
    <NoteContext.Provider value={{ notes, setNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
