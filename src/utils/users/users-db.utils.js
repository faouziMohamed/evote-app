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

export const getUserActivatedCount = async () =>
  User.find({ accountActivated: true }).countDocuments().lean().exec();

export async function verifyUserExists(
  { id = null, cin = null, username = null, email = null, password = false },
  { filter = '' },
) {
  const user =
    (id && (await findUserById(id, filter, password))) ||
    (cin && (await findUserByCIN(Number(cin), filter, password))) ||
    (username && (await findUserByUsername(username, filter, password))) ||
    (email && (await findUserByEmail(email, filter, password))) ||
    null;
  return user;
}

export async function getNewCin(UserModel) {
  const users = await UserModel.find({}).sort({ cin: -1 }).limit(1).exec();
  const cin = (users.length && Number(users[0].cin) + 1) || Config.DEFAULT_CIN;
  return cin;
}
