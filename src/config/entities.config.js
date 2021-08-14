import Config from './config';

const entities = {
  server: {
    name: Config.SERVER_NAME,
    email: Config.SERVER_EMAIL,
    passphrase: Config.SERVER_PASSHPRASE,
    userID() {
      return [{ name: this.name, email: this.email }];
    },
  },
  countCenter: {
    name: Config.COCENTER_NAME,
    email: Config.COCENTER_EMAIL,
    passphrase: Config.COCENTER_PASSHPRASE,
    userID() {
      return [{ name: this.name, email: this.email }];
    },
  },
  validationCenter: {
    name: Config.VALCENTER_NAME,
    email: Config.VALCENTER_EMAIL,
    passphrase: Config.VALCENTER_PASSHPRASE,
    userID() {
      return [{ name: this.name, email: this.email }];
    },
  },
};
export const getEntity = (name = 'server') => entities[name] || 'Error';
export default entities;
