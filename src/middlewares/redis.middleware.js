import HttpStatus from 'http-status-codes';
import { client } from '../config/redis';

export const redis_data = async(req, res, next) => {

    await client.get('allNotes', (err, redis_data) => {
        if (err) {
            return err;
        } else if (redis_data) {
            res.status(HttpStatus.OK).json({
                code: HttpStatus.OK,
                data: JSON.parse(redis_data),
                message: 'notes fetched from redis successfully'
            });

        } else {
            next();
        }
    });
}

export const redis_single_note = async(req, res, next) => {
    const _id = req.params._id;
    await client.get('singleNote', (err, redis_data) => {
        if (err) {
            return err;
        } else if (JSON.parse(redis_data)._id == _id) {
            res.status(HttpStatus.OK).json({
                code: HttpStatus.OK,
                data: JSON.parse(redis_data),
                message: 'note is fetched from redis successfully'
            });
        } else {
            next();
        }
    });
}