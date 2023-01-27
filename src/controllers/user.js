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

export const getAllUser = async (req, res) => {
  try {
    const users = await User.find();
    res.json({ data: users });
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
