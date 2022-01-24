import express from 'express';
import * as noteController from '../controllers/note.controller';
import { newNoteValidator } from '../validators/note.validator';
import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();

//route for creating a note
router.post('', newNoteValidator, userAuth, noteController.newNote)

//route to get all notes
router.get('', userAuth, redis.redis_data, noteController.getAllNotes);

//route to get all archieved notes
router.get('/archievedNotes', userAuth, noteController.getArchievedNotes);

//route to get all trashed notes
router.get('/trashedNotes', userAuth, noteController.getTrashedNotes);

//route to get a single note by their note id
router.get('/:_id', userAuth, redis.redis_single_note, noteController.getNote);

//route to update a single note by their note id
router.put('/:_id', newNoteValidator, userAuth, noteController.updateNote);

//route to archieve a single note by their note id
router.put('/archieve/:_id', userAuth, noteController.archieveNote);

//route to trash a single note by their note id
router.put('/trash/:_id', userAuth, noteController.trashNote);

//route to delete a single note by their note id
router.delete('/:_id', userAuth, noteController.deleteNote);

export default router;