import express from 'express';
import * as noteController from '../controllers/note.controller.js';

const router = express.Router();

router.post('/createNote', noteController.newNote)