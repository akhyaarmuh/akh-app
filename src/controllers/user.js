import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

export const createUser = async (req, res) => {
  const payload = req.body;

  try {
    await User.save(payload);
    res.sendStatus(201);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Internal server error', error });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const { user_pass, ...user } = await User.findByUsername(username);

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
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN, {
      expiresIn: '1d',
    });

    // update refresh_token on table users
    await User.updateTokenById(user.user_id, refreshToken);

    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.status(200).json({ accessToken });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Internal server error', error });
  }
};

export const getAllUser = async (req, res) => {
  try {
    const users = await User.find();
    res.json({ data: users });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Internal server error', error });
  }
};

export const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refresh_token;
    if (!refreshToken) return res.sendStatus(401);

    const user = await User.find(`refresh_token = '${refreshToken}'`);
    if (!user[0]) return res.sendStatus(403);

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN, async (err, decoded) => {
      if (err) return res.sendStatus(403);

      const accessToken = jwt.sign(
        {
          user_id: decoded.user_id,
          biz: decoded.biz,
          capabilities: decoded.capabilities,
        },
        process.env.ACCESS_TOKEN,
        {
          expiresIn: '15s',
        }
      );
      res.json({ accessToken });
    });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Internal server error', error });
  }
};

export const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);

    if (!user) return res.status(404).json({ message: 'Data tidak ditemukan' });

    res.json({ data: user });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Internal server error', error });
  }
};

export const deactiveUserById = async (req, res) => {
  const { id } = req.params;

  try {
    await User.findByIdAndDeactive(id);
    res.sendStatus(200);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Internal server error', error });
  }
};

export const updateUserById = async (req, res) => {
  const { id } = req.params;
  const payload = req.body;

  try {
    await User.findByIdAndUpdate(id, payload);
    res.sendStatus(200);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Internal server error', error });
  }
};

export const deleteUserById = async (req, res) => {
  const { id } = req.params;
  try {
    await User.findByIdAndDelete(id);
    res.sendStatus(200);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Internal server error', error });
  }
};
