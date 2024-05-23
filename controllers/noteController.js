import mongoose from "mongoose";
import Note from "../models/NotesModel.js";

// Get all notes
export const getNotes = async (req, res) => {
  const user_id = req.user._id;
  const notes = await Note.find({ user_id }).sort({ createdAt: -1 });

  res.status(200).json(notes);
};

// Get a single note
export const getNote = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such note" });
  }

  const note = await Note.findById(id);

  if (!note) {
    return res.status(400).json({ error: "No such note" });
  }

  res.status(200).json(note);
};

// Create a new note
export const createNote = async (req, res) => {
  const { title, notes } = req.body;

  let emptyFields = [];

  if (!title) {
    emptyFields.push("title");
  }
  if (!notes) {
    emptyFields.push("notes");
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all the fields", emptyFields });
  }

  // Add doc to db
  try {
    const user_id = req.user._id;
    const note = await Note.create({ title, notes, user_id });
    res.status(200).json(note);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a note
export const deleteNote = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such note" });
  }

  const note = await Note.findOneAndDelete({ _id: id });

  if (!note) {
    return res.status(400).json({ error: "No such note" });
  }

  res.status(200).json(note);
};

// Update a note
export const updateNote = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such note" });
  }

  const note = await Note.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!note) {
    return res.status(400).json({ error: "No such note" });
  }

  res.status(200).json(note);
};
