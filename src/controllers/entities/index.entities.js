import { getEntity } from '../../config/entities.config';
import { getErrorMessage } from '../../data/common.cms';
import Keys, { decryptPassphrase } from '../../models/keys.model';
import GPGEncryptor from '../../utils/lib/gpgEncryptor';

export const constructEntity = (entityType = 'server') => {
  let entity = {};
  switch (entityType) {
    case 'server': {
      entity = getEntity('server');
      break;
    }
    case 'co':
    case 'countcenter': {
      entity = getEntity('countCenter');

      break;
    }
    case 'vc':
    case 'valcenter': {
      entity = getEntity('validationCenter');
      break;
    }
    default:
      throw new Error(getErrorMessage('InvalidEntityType'));
  }
  return entity;
};
const getKeysFromDB = async (entity, filter = {}) => {
  const key = await Keys.findOne(
    {
      name: entity.name,
      email: entity.email,
    },
    filter,
  )
    .lean()
    .exec();
  if (key) key.passphrase = decryptPassphrase(key.passphrase);
  return key;
};

const createNewKeys = async (entity) =>
  new GPGEncryptor({
    userIDs: entity.userID(),
    passphrase: entity.passphrase,
  }).init();

export async function getEncryptionKeys(entity) {
  const filter = {
    _id: 0,
    publicArmoredKey: 1,
    privateArmoredKey: 1,
    passphrase: 1,
  };
  let entityKeys = await getKeysFromDB(entity, filter);
  let entityGPGEncryptor = null;

  if (entityKeys) {
    entityGPGEncryptor = await GPGEncryptor.fromArmoredKeys({ ...entityKeys });
  } else {
    entityGPGEncryptor = await createNewKeys(entity);
    entityKeys = entityGPGEncryptor.getArmoredKeys();
    const options = {
      ...entityKeys,
      ...entityGPGEncryptor.userID,
      foreignPubKeys: entityGPGEncryptor.foreignPubKeys,
    };

    await Keys.create(options);
    // eslint-disable-next-line no-console
    console.log(`${entity.name} keys created!`);
  }

  return { entityKeys, entityGPGEncryptor };
}

export const getEntityArmoredPublicKey = async (entity) => {
  const { entityKeys = '' } = await getEncryptionKeys(entity);
  return entityKeys.publicArmoredKey;
};
