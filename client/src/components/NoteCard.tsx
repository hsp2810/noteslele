import DoneIcon from "@mui/icons-material/Done";
import EditIcon from "@mui/icons-material/Edit";
import { Note } from "../models/Note";
import { Dispatch, SetStateAction } from "react";

type SetActiveFunction = Dispatch<SetStateAction<boolean>>;
type SetEditNoteFunction = Dispatch<SetStateAction<any>>;

interface ComponentProps {
  note: Note;
  setIsActive: SetActiveFunction;
  isActive: boolean;
  setEditNote: SetEditNoteFunction;
}

const NoteCard: React.FC<ComponentProps> = ({
  note,
  setIsActive,
  isActive,
  setEditNote,
}) => {
  const handleCompleted = (): void => {};

  const handleEdit = (): void => {
    setIsActive((isActive) => !isActive);
    setEditNote(note);
  };

  return (
    <div className='p-4 md:w-[25rem] '>
      <div className='flex rounded-lg h-full bg-slate-2 00 p-8 flex-col'>
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
