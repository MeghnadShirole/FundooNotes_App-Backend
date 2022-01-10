import mongoose from 'mongoose';
import logger from './logger';

const database = async() => {
    try {
        const DATABASE = process.env.DATABASE;

        await mongoose.connect(DATABASE, {
            useFindAndModify: false,
            useCreateIndex: true,
            autoIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        logger.info('Connected to the database.');
    } catch (error) {
        logger.error('Could not connect to the database.', error);
    }
};
export default database;