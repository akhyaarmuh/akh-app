import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { getUserByName } from '../models/user.js';

export const login = async (req, res) => {
  const { username, password } = req.body;
  console.log('res');

  try {
    const [users] = await getUserByName(username);

    // jika username tidak ditemukan
    if (!users[0])
      return res.status(404).json({
        message: 'Nama pengguna tidak ditemukan',
      });

    // jika username ditemukan => checkpassword
    const matchPassword = await bcrypt.compare(password, users[0].user_pass);

    // jika password salah
    if (!matchPassword)
      return res.status(404).json({
        message: 'Katasandi salah',
      });

    const accessToken = jwt.sign(users[0], process.env.ACCESS_TOKEN, {
      expiresIn: '15s',
    });

    res.status(200).json({ accessToken });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Internal server error', error });
  }
};
