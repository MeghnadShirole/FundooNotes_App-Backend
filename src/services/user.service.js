import User from '../models/user.model';
import bcrypt from 'bcrypt';
import * as utils from '../utils/user.util';

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

export const login = (userData, callback) => {
    User.findOne({
        "email": userData.email
    }, (err, result) => {
        if (err) {
            callback(err, null);
        } else if (result != null) {
            const validPassword = bcrypt.compareSync(userData.password, result.password);
            if (validPassword == true) {
                const loginToken = utils.generateToken(result);
                callback(null, loginToken);
            } else {
                callback("Incorrect password")
            }
        } else {
            callback("Invalid user");
        }
    });
}