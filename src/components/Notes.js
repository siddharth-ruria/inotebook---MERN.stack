import React, { useContext, useEffect, useRef, useState } from "react";
import NoteItem from "./NoteItem";

import noteContext from "../context/notes/noteContext";
import { v4 as uuidv4 } from "uuid";
import AddNote from "./AddNote";
import { useNavigate } from "react-router-dom";

const Notes = (props) => {
  const context = useContext(noteContext);
  const { notes, getAllNotes, updateNote } = context;
  let navigate = useNavigate();
  console.log(localStorage.getItem("token"));

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getAllNotes();
    } else {
      navigate("/login");
    }
    // eslint-disable-next-line
  }, []);

  const ref = useRef(null);
  const refClose = useRef(null);

  const [note, setNote] = useState({
    id: "",
    etitle: "",
    edescription: "no description",
    etag: "notes",
  });

  const updateNoteFunc = (currentNote) => {
    ref.current.click();
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
  };

  const addNoteClick = (e) => {
    updateNote(note.id, note.etitle, note.edescription, note.etag);
    refClose.current.click();
    props.showAlert("note updated successfully", "success");
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.id]: e.target.value });
  };

  return (
    <>
      <AddNote showAlert={props.showAlert} />
      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        ref={ref}
      >
        launch modal
      </button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                edit note
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="my-4">
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    <h5>title</h5>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    value={note.etitle}
                    aria-describedby="emailHelp"
                    onChange={onChange}
                    minLength={5}
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
                    id="edescription"
                    name="edescription"
                    value={note.edescription}
                    onChange={onChange}
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
                    id="etag"
                    name="etag"
                    value={note.etag}
                    onChange={onChange}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                ref={refClose}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={addNoteClick}
                disabled={
                  note.etitle.length < 5 || note.edescription.length < 7
                }
              >
                save changes
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-4">
        <h1>your notes</h1>

        {notes.length === 0 ? (
          <p>no notes available</p>
        ) : (
          notes.map((note) => {
            return (
              <NoteItem
                key={uuidv4()}
                note={note}
                updateNote={updateNoteFunc}
                showAlert={props.showAlert}
              />
            );
          })
        )}
      </div>
    </>
  );
};

export default Notes;
