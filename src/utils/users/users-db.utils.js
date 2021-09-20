import Config from '../../config/config';
import User from '../../models/users.model';

export const findUserByEmail = async (email, filter = {}, password = false) =>
  User.findOne({ email }, password && '+password')
    .select(filter)
    .lean()
    .exec();

export const findUserByUsername = async (
  username,
  filter = {},
  password = false,
) =>
  User.findOne({ username }, password && '+password')
    .select(filter)
    .lean()
    .exec();

export const findUserById = async (id, filter = {}, password = false) =>
  User.findById(id, password && '+password')
    .select(filter)
    .lean()
    .exec();

export const findUserByCIN = async (cin, filter = {}, password = false) =>
  User.findOne({ cin }, password && '+password')
    .select(filter)
    .lean()
    .exec();

export const findAllUsers = async (filter = {}, password = false) =>
  User.find({}, password && '+password')
    .select(filter)
    .lean()
    .exec();

export const getCountUserActivated = async () =>
  User.find({ accountActivated: true }).countDocuments().lean().exec();

export const existsUserById = async (_id) => User.exists({ _id });
export const existsUserByEmail = async (email) => User.exists({ email });
export const existsUserByUsername = async (username) =>
  User.exists({ username });
export const existsUserByCIN = async (cin) => User.exists({ cin });

export async function verifyUserExists({ id: _id, email, username, cin }) {
  if (_id) return existsUserById(_id);
  if (email) return existsUserByEmail(email);
  if (username) return existsUserByUsername(username);
  if (cin) return existsUserByCIN(cin);
  throw new Error('No user to verify');
}

export async function getNewCin(UserModel) {
  const users = await UserModel.find({}).sort({ cin: -1 }).limit(1).exec();
  const cin = (users.length && Number(users[0].cin) + 1) || Config.DEFAULT_CIN;
  return cin;
}

export const createUser = async (userData) => User.create(userData);

export const deleteUser = async ({ id, cin, username, email }) => {
  const query = {};
  if (id) query._id = id;
  else if (cin) query.cin = cin;
  else if (username) query.username = username;
  else if (email) query.email = email;
  else throw new Error('No user id, cin, username or email provided');
  return User.findOneAndDelete(query).exec();
};
