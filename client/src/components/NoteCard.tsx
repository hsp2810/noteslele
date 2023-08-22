import DoneIcon from "@mui/icons-material/Done";
import EditIcon from "@mui/icons-material/Edit";
import { Note } from "../models/Note";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import axios from "axios";
import "../styles/note.css";

type SetActiveFunction = Dispatch<SetStateAction<boolean>>;
type SetEditNoteFunction = Dispatch<SetStateAction<any>>;

interface ComponentProps {
  note: Note;
  setIsActive: SetActiveFunction;
  isActive: boolean;
  setEditNote: SetEditNoteFunction;
  fetchNotes: Function;
}

const NoteCard: React.FC<ComponentProps> = ({
  note,
  setIsActive,
  setEditNote,
  fetchNotes,
}) => {
  const [noteIsCompleted, setNoteCompleted] = useState(false);
  const handleCompleted = async () => {
    const response = await axios.post(
      `http://localhost:5000/notes/${note._id}`
    );
    if (response) {
      setNoteCompleted(true);
    }
  };

  const handleEdit = (): void => {
    setIsActive((isActive) => !isActive);
    setEditNote(note);
  };

  return (
    <div className={`p-4 md:w-[25rem] ${noteIsCompleted ? "hidden" : ""}`}>
      <div className='flex rounded-lg h-full bg-slate-200 p-8 flex-col transition-transform duration-500 ease-in-out'>
        <div className='flex items-center mb-3'>
          <h2 className='text-gray-900 title-font text-2xl font-medium uppercase'>
            {note.title}
          </h2>
        </div>
        <div className='flex-grow'>
          <p className='leading-relaxed text-base'>{note.description}</p>
          <button
            className='mt-8 mr-5 text-green-500 inline-flex items-center uppercase'
            onClick={handleCompleted}
          >
            completed
            <DoneIcon />
          </button>
          <button
            className='mt-3 mr-2 text-pink-500 inline-flex items-center uppercase'
            onClick={handleEdit}
          >
            edit
            <EditIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
