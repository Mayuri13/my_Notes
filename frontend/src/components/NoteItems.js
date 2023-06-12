import React , {useContext} from "react";
import noteContext from "../context/NoteContext";

export default function NoteItems(props) {
  const {deleteNote} = useContext(noteContext) 
  const {notes, updateNote} = props;
  return (
    <>
    <div className="col-md-3 my-3">
      <div className="card" style={{ width: "18rem" }}>
        <div className="card-body">
            <div className="d-flex justify-content-between ">
          <h5 className="card-title">{notes.title}</h5>
          <div className="d-flex">
            
            {/* Delete icon */}
          <i className="fa-solid fa-trash-can mx-2" onClick={()=>{deleteNote(notes._id); props.showAlert("Deleted successfully","success");}}></i>
          <i className="fa-solid fa-pen-to-square" onClick={()=>{updateNote(notes)}}></i>
          </div>
          </div>
          <p className="card-text">{notes.description}</p>
        </div>
      </div>
    </div>
    </>
  );
}
