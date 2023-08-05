import AddIcon from "@mui/icons-material/Add";
import { ChangeEvent, useState } from "react";

const defNote = {
  title: "",
  description: "",
  isDone: false,
};

const CreateNote = () => {
  const [note, setNote] = useState<any>(defNote);

  const handleCreate = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    console.log(note);
    const response = await fetch("http://localhost:5000/notes/insert", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(note),
    });

    const data = await response.json();

    if (data) {
      alert("Note Added");
      setNote(defNote);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h1 className='text-gray-900 text-2xl font-medium uppercase text-center mt-[6rem] mb-5'>
        Create a Note
      </h1>
      <form className='w-[50%] m-auto'>
        <input
          type='text'
          className='border border-slate-300 bg-slate-300 focus:outline-none rounded-lg my-3 py-2 px-4 block w-full placeholder-slate-500 text-gray-900 '
          placeholder='Enter note title'
          onChange={handleChange}
          name='title'
          value={note.title}
        />
        <input
          type='text'
          className='border border-slate-300 bg-slate-300 focus:outline-none rounded-lg my-3 py-2 px-4 block w-full placeholder-slate-500 text-gray-900'
          placeholder='Enter note description'
          onChange={handleChange}
          name='description'
          value={note.description}
        />
        <button
          className='mt-8 mr-5 bg-green-100 p-2 rounded-lg m-auto block w-full text-green-500 items-center uppercase'
          onClick={(e: any) => handleCreate(e)}
        >
          Add Note
          <AddIcon />
        </button>
      </form>
    </div>
  );
};

export default CreateNote;
