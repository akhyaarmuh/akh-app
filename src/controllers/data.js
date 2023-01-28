import fs from 'fs';
import path from 'path';
import Data from '../models/data.js';
import { __dirname } from '../utilities/index.js';

export const createData = async (req, res) => {
  const { meta, ...data } = JSON.parse(req.body.data);
  const slug = data.name.toLowerCase().replaceAll(' ', '-');
  let fileName = '';

  if (req.files) {
    const image = req.files.image;
    const imageSize = image.size;
    const ext = path.extname(image.name);
    fileName = new Date().getTime() + ext;
    const allowedType = ['.png', '.jpg', '.jpeg'];

    if (!allowedType.includes(ext.toLocaleLowerCase()))
      return res.status(422).json({ message: 'Gambar tidak diizinkan' });
    if (imageSize > 5000000)
      return res.status(422).json({ message: 'Gambar harus di bawah 5 MB' });

    image.mv(`${__dirname}/public/images/${fileName}`, async (error) => {
      if (error) return res.status(500).json({ message: error.message, error });
    });
  }

  try {
    const payload = { data: [{ ...data, slug }], meta };
    if (fileName)
      payload.data.push({ ...data, name: fileName, data_type: 'media', slug: fileName });

    await Data.save(payload);

    res.sendStatus(201);
  } catch (error) {
    fs.unlinkSync(`${__dirname}/public/images/${fileName}`);
    res.status(500).json({ message: error.message || 'Internal server error', error });
  }
};

export const getAllData = async (req, res) => {
  try {
    const data = await Data.find();
    res.json({ data });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Internal server error', error });
  }
};
