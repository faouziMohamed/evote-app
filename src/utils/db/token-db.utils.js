import Token from '../../models/token.model';

export const createToken = async ({
  user,
  tokenData = { token: '', tokenType: '' },
}) =>
  Token.create({
    token: tokenData.token,
    type: tokenData.tokenType,
    userId: user._id,
  });

export const getUserTokens = async ({ userId }) =>
  Token.find({ userId }).exec();

export const existsToken = async ({ token }) => Token.exists({ token });

export const getToken = async ({ userId, type }) =>
  Token.findOne({ userId, type }).exec();

export const findTokenByID = async (tid) => Token.findById(tid).exec();

export const getUserIdFromToken = async ({ token, type }) => {
  if (!type) throw new Error('Token type is required');
  const doc = await Token.findOne({ token, type }).lean().exec();
  if (!doc) throw new Error('Token not found');
  return doc.userId;
};

export const removeAllTokens = async ({ userId }) =>
  Token.deleteMany({ userId }).exec();
