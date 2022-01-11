import express from 'express';
import * as noteController from '../controllers/note.controller.js';
import { newNoteValidator } from '../validators/note.validator.js';

const router = express.Router();

router.post('/createNote', newNoteValidator, noteController.newNote)