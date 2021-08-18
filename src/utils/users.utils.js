/* eslint-disable no-await-in-loop */
import { names, uniqueNamesGenerator as nameGen } from 'unique-names-generator';

import CandidatesModel from '../models/candidates.model';
import User from '../models/users.model';

class StaticData {
  static cin = Number(9999);
  static numberUserAdded = Number(0);
  static #candidateNumber = Number(0);

  static get candidateCount() {
    return this.#candidateNumber;
  }

  static incNumberCandidateAdded() {
    this.#candidateNumber += 1;
    return this.#candidateNumber;
  }

  static getNewCin() {
    // eslint-disable-next-line no-plusplus
    return this.cin++;
  }

  static setCin(cin) {
    this.cin = cin;
    this.setNumberUserAdded(cin);
  }

  static setNumberCandidateAdded(count) {
    this.#candidateNumber = count;
  }

  static setNumberUserAdded(numberUserAdded) {
    this.numberUserAdded = numberUserAdded;
  }

  static incrementNumberAdded() {
    // eslint-disable-next-line no-plusplus
    this.numberUserAdded++;
  }

  static getNumberUserAdded() {
    return this.numberUserAdded;
  }
}

const generateName = () =>
  nameGen({
    dictionaries: [names],
    length: 1,
    style: 'lowerCase',
  });

const grabData = async (cb) => {
  let dummy = null;
  do {
    dummy = null;
    dummy = await cb();
  } while (dummy !== null);
};

async function grabUsernameEmail() {
  let username;
  let email;
  await grabData(async () => {
    username = generateName();
    return User.findOne({ username }).exec();
  });

  await grabData(async () => {
    email = `${generateName()}@${generateName()}-glpc.ma`;
    return User.findOne({ email }).exec();
  });
  return { username, email };
}

const newUser = async (UserModel, password) => {
  const numberCandidate = StaticData.candidateCount;
  const isTrue = Math.round(Math.random() * 10.6) % 2 === 0;
  const addACandidate = numberCandidate < 5 && isTrue;
  if (addACandidate) StaticData.incNumberCandidateAdded();
  const { username, email } = await grabUsernameEmail();
  const user = new UserModel({
    username,
    email,
    password,
    name: {
      first: generateName(),
      last: generateName(),
    },
    cin: StaticData.getNewCin(),
    birthDate: new Date(),
    isCandidate: addACandidate,
  });
  await UserModel.create(user);
  if (addACandidate) {
    await CandidatesModel.create({ cin: user.cin });
  }
  StaticData.incrementNumberAdded();
  return user;
};

async function findLastCIN(UserModel) {
  const users = await UserModel.find({}).sort({ cin: -1 }).limit(1).exec();
  const cin = (users.length && users[0].cin + 1) || StaticData.getNewCin();
  return cin;
}

async function getCandidateCount() {
  return CandidatesModel.countDocuments().exec() || 0;
}

export const addRandomUserToDB = async (
  howMany = 5,
  password = '123456789',
  model = User,
) => {
  const cin = await findLastCIN(model);
  StaticData.setNumberCandidateAdded(await getCandidateCount());
  StaticData.setCin(cin);
  for (let i = 1; i <= howMany; i++) {
    await newUser(model, password);
    // eslint-disable-next-line no-console
    console.log(`${i} - User ${StaticData.getNumberUserAdded()}  added!`);
  }
  // eslint-disable-next-line no-console
  console.log(
    `All ${howMany} users are added using the '${password}' password!`,
  );
  // eslint-disable-next-line no-console
  console.log('\tNumber of candidate added: ', StaticData.candidateCount);
  // eslint-disable-next-line no-console
  console.log('Done!!!');
  return !1;
};
