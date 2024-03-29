import Biz from '../models/biz.js';

export const createBiz = async (req, res) => {
  const payload = req.body;

  try {
    await Biz.save(payload);
    res.sendStatus(201);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Internal server error', error });
  }
};

export const getAllBiz = async (req, res) => {
  try {
    const bizs = await Biz.find();
    res.json({ data: bizs });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Internal server error', error });
  }
};

export const getBizById = async (req, res) => {
  const { id } = req.params;
  try {
    const biz = await Biz.findById(id);

    if (!biz) return res.status(404).json({ message: 'Data tidak ditemukan' });

    res.json({ data: biz });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Internal server error', error });
  }
};

export const deactiveBizById = async (req, res) => {
  const { id } = req.params;

  try {
    await Biz.findByIdAndDeactive(id);
    res.sendStatus(200);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Internal server error', error });
  }
};

export const updateBizById = async (req, res) => {
  const { id } = req.params;
  const payload = req.body;

  try {
    await Biz.findByIdAndUpdate(id, payload);
    res.sendStatus(200);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Internal server error', error });
  }
};

export const deleteBizById = async (req, res) => {
  const { id } = req.params;
  try {
    await Biz.findByIdAndDelete(id);
    res.sendStatus(200);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Internal server error', error });
  }
};
