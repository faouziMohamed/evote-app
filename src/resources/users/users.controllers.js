import { sendError, sendSucces } from '../../utils/crud';
import User from './users.model';
import { findUserById, findUserByUsername, getMessage } from './users.utils';

export const getUserById = (model) => async (req, res) => {
  try {
    const { id } = req.query;
    if (!id) {
      return sendError(res, 401, getMessage('uid'));
    }

    const user = await findUserById(model, id);
    if (!user) {
      return sendError(res, 404, getMessage({ reason: 404 }));
    }
    return sendSucces(res, 200, user);
  } catch (err) {
    return sendError(res, 400, err.message);
  }
};

export const getOneUserData = (model) => async (req, res) => {
  try {
    const { username } = req.params;
    if (!username) {
      return sendError(res, 400, getMessage(400));
    }
    const user = await findUserByUsername(model, username);
    if (!user) {
      return sendError(res, 404, getMessage({ reason: 404 }));
    }
    return res.status(200).json(user);
  } catch (err) {
    return sendError(res, 400, err.message);
  }
};

const controllers = (model) => ({
  getOneUserData: getOneUserData(model),
  getUserById: getUserById(model),
});

export default controllers(User);
