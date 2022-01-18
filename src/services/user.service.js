import User from '../models/user.model';
import * as utils from '../Utils/utils';
import bcrypt from 'bcrypt';
import * as sendMail from '../middlewares/nodemailer.middleware'


//User Registration
export const registration = (userData) => {
    const password = utils.hashPassword(userData);
    var newUser = new User({
        "firstname": userData.firstname,
        "lastname": userData.lastname,
        "email": userData.email,
        "password": password,
    })
    const result = newUser.save(userData);
    if (!result)
        throw err
    return result;
};


//User Login
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

//Forget Password
export const forgetPassword = async(userData, callback) => {
    User.findOne({
        "email": userData.email
    }, (err, result) => {
        if (err) {
            callback(err, null);
        } else if (result != null) {
            const forgetPasswordToken = utils.forgetPasswordToken(result);

            const port = process.env.APP_PORT;
            const host = process.env.APP_HOST;
            const api_version = process.env.API_VERSION;

            const url = `${host}:${port}/api/${api_version}/users/resetPassword/${forgetPasswordToken}`;
            const mail = sendMail.sendEMail(url, userData.email);
            return mail;

        } else {
            callback("Invalid user");
        }
    });
}

//Reset Password
export const resetPassword = async(_id, userData) => {
    const password = utils.hashPassword(userData);
    const data = await User.findByIdAndUpdate({
        _id: _id.userId
    }, {
        $set: {
            password: password
        },
    });
    userData, {
        new: true
    }
    return data;
};