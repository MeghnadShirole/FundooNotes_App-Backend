import User from '../models/user.model.js';

export const registration = async(userData) => {
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