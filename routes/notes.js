 const express = require('express')
 const Note = require('../models/NotesModel')
 const {createNote, getNotes, getNote, deleteNote, updateNote} = require('../controllers/noteController')
 const requireAuth = require('../middleware/requireAuth')

 const router = express.Router()

 // Require auth for all the routes
 router.use(requireAuth)

 // Get all notes
 router.get('/', getNotes)

 // Get a single note
 router.get('/:id', getNote)

 // Post a new note
 router.post('/', createNote)

 // Delete a note
 router.delete('/:id', deleteNote)

 // Update a note
 router.patch('/:id', updateNote)
 module.exports = router