import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";

const AddNote = (props) => {
  const context = useContext(noteContext);
  const { addNote } = context;

  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "",
  });


  const addNoteClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({
      title: "",
      description: "",
      tag: "",
    });
    props.showAlert("note added successfully", "success");
  };
  const onChange = (e) => {
    setNote({ ...note, [e.target.id]: e.target.value });
  };

  return (
    <div className="container my-4">
      <h1>add a note</h1>
      <form className="my-4">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            <h5>title</h5>
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            aria-describedby="emailHelp"
            onChange={onChange}
            value={note.title}
            minLength={7}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            <h5>description</h5>
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            onChange={onChange}
            value={note.description}
            minLength={7}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">
            <h5>tag</h5>
          </label>
          <input
            type="text"
            className="form-control"
            id="tag"
            name="tag"
            onChange={onChange}
            value={note.tag}
            minLength={3}
            required
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={addNoteClick}
          disabled={note.title.length < 5 || note.description.length < 7}
        >
          add note
        </button>
      </form>
    </div>
  );
};

export default AddNote;
