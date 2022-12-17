import bizModels from '../models/biz.js';
import bizmetaModels from '../models/bizmeta.js';

export const createBiz = async (req, res) => {
  const { body } = req;
  const slug = body.name.toLowerCase().replaceAll(' ', '-');

  try {
    const [biz] = await bizModels.createBiz({ ...body, slug });
    const biz_id = biz.insertId;

    body.meta.forEach(async (meta) => {
      await bizmetaModels.createBizmeta(biz_id, meta);
    });

    res.status(201).json({ message: 'Berhasil menambah biz baru' });
  } catch (error) {
    res.status(500).json({
      message: error.message || 'Server error',
      error,
    });
  }
};

export default { createBiz };
