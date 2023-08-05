import { useEffect, useState } from "react";
import NoteCard from "./NoteCard";
import { Note } from "../models/Note";
import EditPopup from "./EditPopup";

const Notes = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [editNote, setEditNote] = useState<Note>();
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    const response = await fetch("http://localhost:5000/notes", {
      method: "GET",
    });
    const data = await response.json();
    const notes: Note[] = data.notes;
    setNotes(notes);
  };

  return (
    <>
      <div className='grid grid-cols-4 gap-4'>
        {notes &&
          notes.map((note: Note) => {
            return (
              <div key={note._id}>
                <NoteCard
                  note={note}
                  isActive={isActive}
                  setIsActive={setIsActive}
                  setEditNote={setEditNote}
                />
              </div>
            );
          })}
      </div>
      {editNote && (
        <EditPopup
          isActive={isActive}
          setIsActive={setIsActive}
          editNote={editNote}
          setEditNote={setEditNote}
          fetchNotes={fetchNotes}
        />
      )}
    </>
  );
};

export default Notes;
