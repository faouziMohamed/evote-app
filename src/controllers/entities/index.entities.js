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
const getKeysFromDB = async (entityData, filter = {}) => {
  const key = await Keys.findOne(
    {
      name: entityData.name,
      email: entityData.email,
    },
    filter,
  )
    .lean()
    .exec();
  if (key) key.passphrase = decryptPassphrase(key.passphrase);
  return key;
};

const createNewKeys = async (entityData) =>
  new GPGEncryptor({
    userIDs: entityData.userID(),
    passphrase: entityData.passphrase,
  }).init();

export async function getEncryptionKeys(entityName) {
  const filter = {
    _id: 0,
    publicArmoredKey: 1,
    privateArmoredKey: 1,
    passphrase: 1,
  };

  const entityData = constructEntity(entityName.toLowerCase());
  let entityKeys = await getKeysFromDB(entityData, filter);
  let entityGPGEncryptor = null;

  if (entityKeys) {
    entityGPGEncryptor = await GPGEncryptor.fromArmoredKeys({ ...entityKeys });
  } else {
    entityGPGEncryptor = await createNewKeys(entityData);
    entityKeys = entityGPGEncryptor.getArmoredKeys();
    const options = {
      ...entityKeys,
      ...entityGPGEncryptor.userID,
      foreignPubKeys: entityGPGEncryptor.foreignPubKeys,
    };

    await Keys.create(options);
    // eslint-disable-next-line no-console
    console.log(`${entityData.name} keys created!`);
  }

  return { entityKeys, entityGPGEncryptor };
}

export const getEntityArmoredPublicKey = async (entityName) => {
  const { entityKeys = '' } = await getEncryptionKeys(entityName);
  return entityKeys.publicArmoredKey;
};
