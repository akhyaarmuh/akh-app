import jwt from 'jsonwebtoken';

export const verifyToken = async (req, res, next) => {
  // const authHeader = req.headers.authorization;

  // const token = authHeader && authHeader.split(' ')[1];

  // if (!token) return res.status(401).json({ message: 'Not signature' });

  // jwt.verify(token, process.env.ACCESS_TOKEN, (err, decoded) => {
  //   if (err) return res.status(403).json({ message: 'Signature is not valid' });

  //   req.user_id = decoded.user_id;
  //   req.capabilities = decoded.capabilities;
  //   next();
  // });
  next();
};
