import fs from 'fs';
import path from 'path';
import Data from '../models/data.js';
import { __dirname } from '../utilities/index.js';

export const createMedia = async (req, res) => {
  const image = req.files.image;
  // jika tidak ada gambar
  if (!image) return res.sendStatus(422);

  const allowedType = ['.png', '.jpg', '.jpeg'];
  const ext = path.extname(image.name);
  // file gambar harus benar
  if (!allowedType.includes(ext.toLocaleLowerCase()))
    return res.status(422).json({ message: 'Gambar tidak diizinkan' });

  const imageSize = image.size;
  // ukuran gambar jangan lebih 5MB
  if (imageSize > 5000000)
    return res.status(422).json({ message: 'Gambar harus di bawah 5 MB' });

  const fileName = new Date().getTime() + ext;
  image.mv(`${__dirname}/public/images/${fileName}`, (error) => {
    if (error) return res.status(500).json({ message: error.message, error });
  });

  try {
    const { author, biz } = req.body;

    const data = await Data.save({
      name: fileName,
      data_type: 'media',
      author: Number(author),
      biz: Number(biz),
    });

    res.json({ insertId: data.insertId, slug: fileName });
  } catch (error) {
    fs.unlinkSync(`${__dirname}/public/images/${fileName}`);
    res.status(500).json({ message: error.message || 'Internal server error', error });
  }
};

export const createData = async (req, res) => {
  const payload = req.body;

  try {
    await Data.save(payload);
    res.sendStatus(201);
  } catch (error) {
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
