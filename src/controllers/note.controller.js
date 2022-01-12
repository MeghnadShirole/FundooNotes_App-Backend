import HttpStatus from 'http-status-codes';
import * as noteService from '../services/note.service';

/**
 * Controller to create a new note
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */

export const newNote = async(req, res, next) => {
    try {
        const data = await noteService.newNote(req.body);
        console.log(req.body);
        res.status(HttpStatus.CREATED).json({
            code: HttpStatus.CREATED,
            data: data,
            message: 'note created successfully'
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Controller to get all notes
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */

export const getAllNotes = async(req, res, next) => {
    try {
        const data = await noteService.getAllNotes(req.body);
        res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            data: data,
            message: 'notes fetched successfully'
        });
    } catch (error) {
        next(error)
    }
};

/**
 * Controller to get a single note
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */

export const getNote = async(req, res, next) => {
    try {
        const data = await noteService.getNote(req.params._id);
        res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            data: data,
            message: 'note fetched successfully'
        });
    } catch (error) {
        next(error);
    }
};