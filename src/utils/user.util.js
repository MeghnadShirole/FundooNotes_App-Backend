import jwt from 'jsonwebtoken';

export const generateToken = (result) => {
    const token = jwt.sign({ "email": result.email, "id": result._id }, process.env.SECRET_KEY)
    return token;
}