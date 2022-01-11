import HttpStatus from 'http-status-codes';
import * as noteService from '../services/note.service.js';

/**
 * Controller to create a new note
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */

export const newNote = async(req, res, next) => {
    try {
        const data = await noteService.newNote(req.body);
        res.status(HttpStatus.CREATED).json({
            code: HttpStatus.CREATED,
            data: data,
            message: 'note created successfully'
        });
    } catch (error) {
        next(error);
    }
};