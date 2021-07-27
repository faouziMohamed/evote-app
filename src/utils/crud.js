export function sendError(res, code, message) {
  return res.status(code).json({ status: 'Error', ...message });
}

export function sendSucces(res, code, message, data = null) {
  const msgObject = { status: 'Success', ...message };
  if (data !== null) {
    msgObject.data = data;
  }
  return res.status(code).json(msgObject);
}
