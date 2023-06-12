import React, { useContext, useState } from "react";
import noteContext from "../context/NoteContext";

export default function AddNotes(props) {
  //we are using the context api, which is provided by NoteContext
  const context = useContext(noteContext);

  //We are destructuring addNote from context which contains addNote, deleteNote and editNote
  const { addNote } = context;

  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "",
  });
  //On click handler when we clicked on submit
  const addNoteClick = (e) => {
    // To stop loading on clicking
    e.preventDefault();
    //We can take a confirmation from user before adding, by using confirm method.
    const shouldAddNote = window.confirm("Let's add your note!");
    if (shouldAddNote) {
      addNote(note.title, note.description, note.tag);
      setNote({
        title: "",
        description: "",
        tag: "",
      })
      props.showAlert("Added successfully","success");
    }
  };
  
  //When in input places values are inserted it copies them to setNote and then setNote add them to noteItems
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <div className="container mx-3">
      <h1>Add Notes</h1>
      <div className="container my-3">
        <form>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              value={note.title}
              name="title"
              onChange={onChange}
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Description
            </label>
            <input
              type="text"
              className="form-control"
              id="description"
              value={note.description}
              name="description"
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Tag
            </label>
            <input
              type="text"
              className="form-control"
              id="tag"
              value={note.tag}
              name="tag"
              onChange={onChange}
            />
          </div>

          <button disabled={note.title.length<5 || note.description.length<5} type="submit" onClick={addNoteClick} className="btn btn-dark">
            Add Note
          </button>
        </form>
      </div>
    </div>
  );
}
