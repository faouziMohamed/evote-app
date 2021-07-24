import { sendError, sendSucces } from '../../utils/crud';
import User from './users.model';

// Get user document from the database using it username or userId
const getOneUser = async (model, id = null, userName = null) => {
  const query = id ? { _id: id } : { userName };
  const user = await model.findOne(query, { password: false }).exec();
  return user;
};

export const getUserById = (model) => async (req, res) => {
  try {
    const { id } = req.query;

    if (!id) {
      return sendError(res, 401, 'Missing parameters, user id is required');
    }

    const user = await getOneUser(model, id);
    if (!user) {
      return sendError(res, 404, 'User not found');
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
    const { id } = req.query;
    if (!id) {
      return sendError(
        res,
        401,
        'Missing parameters, user id id required to activate the account',
      );
    }

    const user = await getOneUser(model, id);
    if (!user) {
      return sendError(res, 404, 'User not found');
    }

    const { userName, email, password, isPDG, birthDate, firstName, lastName } =
      req.body;
    if (
      !userName ||
      !email ||
      !password ||
      !birthDate ||
      !firstName ||
      !lastName
    ) {
      return sendError(res, 400, 'Missing parameters');
    }

    const userData = {
      userName,
      email,
      password,
      birthDate,
      name: { first: firstName, last: lastName },
      hasAccountActivated: true,
      isPDG: isPDG || false,
    };

    await user.update(userData);
    return sendSucces(res, 204, 'Account activated');
  } catch (err) {
    return sendError(res, 400, err.message);
  }
};

export const getOneUserData = (model) => async (req, res) => {
  try {
    const { userName } = req.params;
    if (!userName) {
      return sendError(res, 400, 'Missing parameters');
    }
    const user = await getOneUser(model, null, userName);
    if (!user) {
      return sendError(res, 404, 'User not found');
    }
    return sendSucces(res, 200, 'Account information', user);
  } catch (err) {
    return sendError(res, 400, err.message);
  }
};

// Add new User to the database with all fields not null in the schema
export const createOneUser = (model) => async (req, res) => {
  try {
    const { userName, email, password, isPDG, birthDate } = req.body;
    if (!userName || !email || !password || !birthDate) {
      return sendError(res, 400, 'Missing parameters');
    }

    const userData = {
      userName,
      email,
      password,
      birthDate,
      isPDG: isPDG || false,
    };
    const user = await model.create(userData);
    return sendSucces(res, 201, 'Account created but not activated', user);
  } catch (err) {
    return sendError(res, 400, err.message);
  }
};

const controllers = (model) => ({
  activateOneAccount: activateOneAccount(model),
  getOneUserData: getOneUserData(model),
  createOneUser: createOneUser(model),
});

export default controllers(User);
