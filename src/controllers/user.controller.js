import * as UserService from '../services/user.service';
import HttpStatus from 'http-status-codes';

/**
 * Controller to create a new user
 * @param  {object} req - request object
 * @param {object} res - response object
 */

export const registration = (req, res) => {
    try {
        const result = UserService.registration(req.body);
        res.status(HttpStatus.CREATED).send({
            code: HttpStatus.CREATED,
            data: result,
            message: 'User Registered Successfully'
        });
    } catch (err) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
            code: HttpStatus.INTERNAL_SERVER_ERROR,
            data: '',
            message: err.message
        });
    }
}

/**
 * Controller for logging in a user
 * @param  {object} req - request object
 * @param {object} res - response object
 */

export const login = (req, res) => {
    try {
        UserService.login(req.body, (err, result) => {
            if (err) {
                return res.status(HttpStatus.UNAUTHORIZED).send({
                    code: HttpStatus.UNAUTHORIZED,
                    error: err,
                    message: 'Invalid Username or Password'
                });
            } else {
                return res.status(HttpStatus.OK).send({
                    code: HttpStatus.OK,
                    data: result,
                    message: 'Login Successful'
                });
            }
        })
    } catch (err) {
        res.send(err);
    }
}