import jwt from 'jsonwebtoken';

export const generateToken = (userData) => {
    const token = jwt.sign({ "email": userData.email, "id": userData._id }, process.env.SECRET_KEY)
    return token;
}