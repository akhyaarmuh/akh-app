import Biz from '../models/biz.js';

export const createBiz = async (req, res) => {
  const payload = req.body;

  try {
    await Biz.save(payload);
    res.sendStatus(200);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Internal server error', error });
  }
};
