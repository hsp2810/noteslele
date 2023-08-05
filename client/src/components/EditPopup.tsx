import { ChangeEvent, Dispatch, SetStateAction } from "react";
import EditNoteIcon from "@mui/icons-material/EditNote";
import CloseIcon from "@mui/icons-material/Close";
import { Note } from "../models/Note";

type SetActiveFunction = Dispatch<SetStateAction<boolean>>;
type SetEditNoteFunction = Dispatch<SetStateAction<any>>;

interface ComponentProps {
  isActive: boolean;
  setIsActive: SetActiveFunction;
  editNote: Note;
  setEditNote: SetEditNoteFunction;
  fetchNotes: () => {};
}

const EditPopup: React.FC<ComponentProps> = ({
  isActive,
  setIsActive,
  editNote,
  setEditNote,
  fetchNotes,
}) => {
  const handleEditChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setEditNote({ ...editNote, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    const response = await fetch(
      `http://localhost:5000/notes/${editNote._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editNote),
      }
    );
    const data = await response.json();
    setIsActive(false);
    fetchNotes();
  };

  return (
    <>
      {isActive && (
        <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50'>
          <div className='md:w-[25rem] bg-white rounded-lg'>
            <div className='flex rounded-lg bg-slate-200 p-8 flex-col'>
              <div className='flex items-center mb-3'>
                <input
                  type='text'
                  value={editNote.title}
                  onChange={handleEditChange}
                  autoFocus
                  name='title'
                  className='text-gray-900 text-2xl font-medium uppercase p-2 bg-slate-300  focus:outline-none rounded-md'
                />
              </div>
              <div className='flex-grow'>
                <input
                  type='text'
                  value={editNote.description}
                  onChange={handleEditChange}
                  name='description'
                  className='leading-relaxed text-base p-2 w-full bg-slate-300 focus:outline-none rounded-md'
                />
                <button
                  className='mt-8 mr-5 text-green-500 inline-flex items-center uppercase'
                  onClick={handleUpdate}
                >
                  Update Note
                  <EditNoteIcon />
                </button>
                <button
                  className='mt-3 mr-2 text-pink-500 inline-flex items-center uppercase'
                  onClick={() => setIsActive(false)}
                >
                  Cancel
                  <CloseIcon />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditPopup;
