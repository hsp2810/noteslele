import mongoose, { InferSchemaType, model } from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please pass a valid title"],
    },

    description: {
      type: String,
      required: [true, "Please pass a valid description"],
    },

    isDone: {
      type: Boolean,
      required: [true, "Please pass a valid isDone"],
    },
  },
  { timestamps: true }
);

export type Note = InferSchemaType<typeof noteSchema>;
export default model<Note>("note", noteSchema);
