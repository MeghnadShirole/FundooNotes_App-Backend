import express from 'express';
import * as noteController from '../controllers/note.controller.js';
import { newNoteValidator } from '../validators/note.validator.js';
import { userAuth } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/createNote', userAuth, newNoteValidator, noteController.newNote)