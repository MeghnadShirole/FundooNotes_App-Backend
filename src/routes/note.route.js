import express from 'express';
import * as noteController from '../controllers/note.controller';
import { newNoteValidator } from '../validators/note.validator';
import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();

//route for creating a note
router.post('/createNote', newNoteValidator, userAuth, noteController.newNote)

//route to get all notes
router.get('/getAllNotes', userAuth, noteController.getAllNotes);

export default router;