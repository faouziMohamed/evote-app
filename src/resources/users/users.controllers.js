import { sendError, sendSucces } from '../../utils/crud';
import User from './users.model';
import {
  findUserById,
  findUserByUsername,
  getMessage,
  getUserDataFromRequest,
  verifyRequiredFields,
  verifyUserExists,
} from './users.utils';

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

// Activate account by setting the userName, email and password using it's id
// User id is already present to the database or will be added by a adminitrator
export const activateOneAccount = (model) => async (req, res) => {
  try {
    // Ensure the user id passed in params
    const { id } = req.query;
    if (!id) {
      return sendError(res, 401, getMessage('uidRqd'));
    }

    // Ensure the user exists
    const user = await findUserById(model, id);
    if (!user) {
      return sendError(res, 404, getMessage({ reason: 404 }));
    }

    // Ensure that required fields are present in the request body
    if (verifyRequiredFields(req.body)) {
      return sendError(res, 400, getMessage({ reason: 'fieldsRqd' }));
    }

    // Update user document with the passed data
    const userData = getUserDataFromRequest(req);
    Object.keys(userData).forEach((key) => {
      user[key] = userData[key];
    });
    await user.save();

    return sendSucces(res, 204, getMessage({ reason: 'activated' }));
  } catch (err) {
    return sendError(res, 400, err.message);
  }
};

export const getOneUserData = (model) => async (req, res) => {
  try {
    const { userName } = req.params;
    if (!userName) {
      return sendError(res, 400, getMessage(400));
    }
    const user = await findUserByUsername(model, userName);
    if (!user) {
      return sendError(res, 404, getMessage({ reason: 404 }));
    }
    return sendSucces(res, 200, 'Account information', user);
  } catch (err) {
    return sendError(res, 400, err.message);
  }
};

// Add new User to the database : only admin can add new user
export const createOneUser = (model) => async (req, res) => {
  try {
    if (verifyRequiredFields(req.body)) {
      return sendError(res, 400, getMessage({ reson: 400 }));
    }
    const userData = getUserDataFromRequest(req);
    const userExists = await verifyUserExists({ model, userData });
    if (userExists) {
      return sendError(res, 400, getMessage(userExists));
    }
    await model.create(userData);
    const message = getMessage({ reason: 'nactivated' });
    return sendSucces(res, 201, message);
  } catch (err) {
    return sendError(res, 400, err.message);
  }
};

const controllers = (model) => ({
  activateOneAccount: activateOneAccount(model),
  createOneUser: createOneUser(model),
  getOneUserData: getOneUserData(model),
});

export default controllers(User);
