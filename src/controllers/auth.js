import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { getUserByUsername } from '../models/auth.js';

export const login = async (req, res) => {
  const { username, password } = req.body;
  console.log('res');

  try {
    const { user_pass, ...user } = await getUserByUsername(username);

    // jika username tidak ditemukan
    if (!user.user_id)
      return res.status(404).json({
        message: 'Username tidak ditemukan',
      });

    // jika username ditemukan => checkpassword
    const matchPassword = await bcrypt.compare(password, user_pass);

    // jika password salah
    if (!matchPassword)
      return res.status(404).json({
        message: 'Katasandi salah',
      });

    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN, {
      expiresIn: '15s',
    });

    res.status(200).json({ accessToken });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Internal server error', error });
  }
};
