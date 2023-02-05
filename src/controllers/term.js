import Term from '../models/term.js';

export const createTerm = async (req, res) => {
  const payload = req.body;

  try {
    await Term.save(payload);
    res.sendStatus(201);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Internal server error', error });
  }
};
