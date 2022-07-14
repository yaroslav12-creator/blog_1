import jwt from "jsonwebtoken";

export default (req, res, next) => {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');

    if(token) {
        try {
            const decrypted = jwt.verify(token, 'secret1234');

            req.userId = decrypted._id;
            next();
        } catch (error) {
            return res.status(403).json({
                message: 'No access',
            });
        }
    } else {
        return res.status(403).json({ message: 'No access' });
    }
};
