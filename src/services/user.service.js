import User from '../models/user.model.js';
import bcrypt from 'bcrypt';

export const registration = async(userData) => {
    let saltRounds = 10;
    userData.password = bcrypt.hashSync(userData.password, saltRounds);
    var newUser = new User({
        "firstname": userData.firstname,
        "lastname": userData.lastname,
        "email": userData.email,
        "password": userData.password,
    })
    const result = await newUser.save(userData);
    if (!result)
        throw err
    return result;
};