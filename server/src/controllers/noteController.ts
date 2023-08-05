import { RequestHandler } from "express";
import NoteModal, { Note } from "../models/Note";
import createHttpError from "http-errors";
import mongoose from "mongoose";

// Defining Interfaces
interface NoteBody {
  title?: string;
  description?: string;
  isDone?: boolean;
}

interface NoteResponse {
  message: string;
  note: Note;
}

interface NotesResponse {
  message: string;
  notes: Note[];
  notesCount: number;
}

interface NoteRequest {
  id: string;
}

// Insert Note
export const insertNote: RequestHandler<
  undefined,
  NoteResponse,
  NoteBody
> = async (req, res, next) => {
  try {
    const { title, description, isDone } = req.body;

    if (!title || !description) {
      throw createHttpError(400, "Please enter all the details of the note");
    }

    const note = await NoteModal.create({ title, description, isDone });
    note.save();

    res.status(200).json({ message: "NoteModal Inserted", note });
  } catch (error) {
    next(error);
  }
};

// Get All notes
export const getAllNotes: RequestHandler<undefined, NotesResponse> = async (
  req,
  res,
  next
) => {
  try {
    const notes = await NoteModal.find().exec();
    res.status(200).json({
      message: "Fetched all the notes",
      notes,
      notesCount: notes.length,
    });
  } catch (error) {
    next(error);
  }
};

// Get one note
export const getNote: RequestHandler<NoteRequest, NoteResponse> = async (
  req,
  res,
  next
) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      console.log("Going in this block");
      throw createHttpError(400, "Invalid ID");
    }

    const note = await NoteModal.findById(id);
    if (!note) {
      throw createHttpError(400, "Note was found based on the ID");
    }

    res.status(200).json({
      message: "Fetch the note",
      note: note,
    });
  } catch (error) {
    next(error);
  }
};

// Update a note
export const updateNote: RequestHandler<
  NoteRequest,
  NoteResponse,
  NoteBody
> = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      throw createHttpError(400, "Invalid ID");
    }

    const { title, description, isDone } = req.body;
    console.log(title, description, isDone);
    if (!title || !description) {
      throw createHttpError(400, "Please enter all the details of the note");
    }

    const note = await NoteModal.findByIdAndUpdate(id, {
      title,
      description,
      isDone,
    });
    if (!note) {
      throw createHttpError(400, "Note was found based on the ID");
    }

    res.status(200).json({
      message: "Note Updated",
      note: note,
    });
  } catch (error) {
    next(error);
  }
};

// Delete a note
export const deleteNote: RequestHandler<NoteRequest, NoteResponse> = async (
  req,
  res,
  next
) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      console.log("Going in this block");
      throw createHttpError(400, "Invalid ID");
    }

    const note = await NoteModal.findByIdAndDelete(id);
    if (!note) {
      throw createHttpError(400, "Note was found based on the ID");
    }

    res.status(200).json({
      message: "Note Deleted",
      note: note,
    });
  } catch (error) {
    next(error);
  }
};
