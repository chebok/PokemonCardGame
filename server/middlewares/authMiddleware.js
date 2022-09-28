import jwt from 'jsonwebtoken';

const secret = process.env.SECRET;

const authMiddleware = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    next();
  }

  try {
    const token = req.headers.authorization.split(' ')[1];

    if (!token) {
      return res.status(403).json({ message: 'Пользователь не авторизован' });
    }

    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        return res.status(401).send({ message: 'Unauthorized!' });
      }
      req.user = decoded;
      next();
    });
  } catch (e) {
    console.log(e);
    return res.status(403).json({ message: 'Пользователь не авторизован' });
  }
};

export default authMiddleware;
