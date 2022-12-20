import bizModels from '../models/biz.js';
import bizmetaModels from '../models/bizmeta.js';
import { sendResponse } from '../utilities/index.js';

export const createBiz = async (req, res) => {
  const { body } = req;
  const slug = body.name.toLowerCase().replaceAll(' ', '-');

  try {
    const [biz] = await bizModels.createBiz({ ...body, slug });
    const biz_id = biz.insertId;

    body.meta.forEach(async (meta) => {
      await bizmetaModels.createBizmeta(biz_id, meta);
    });

    sendResponse(res, 201, [undefined, 'Berhasil menambah biz baru']);
  } catch (error) {
    sendResponse(res, 500, [error]);
  }
};

export const getAllBiz = async (req, res) => {
  try {
    const [bizs] = await bizModels.getAllBiz();

    sendResponse(res, 200, [], bizs);
  } catch (error) {
    sendResponse(res, 500, [error]);
  }
};

export default { createBiz, getAllBiz };
