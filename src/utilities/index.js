export const sendResponse = (res, status, [error, msg], data) => {
  if (error) {
    res
      .status(status)
      .json({ message: error.message || msg || 'Server error', error });
  } else if (msg) {
    res.status(status).json({ message: msg });
  } else {
    res.status(status).json({ data });
  }
};
