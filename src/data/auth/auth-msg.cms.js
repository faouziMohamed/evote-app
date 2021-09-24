const messages = {
  en: {
    errors: {
      requiredFields: 'Please fill the form, missing credentials',
      missingPassword: 'Please fill the form, Password field missing',
      username: 'Please fill the form, Username field is missing',
      email: 'Please fill the form, Email field is missing',
      birthdate: 'Please fill the form, Birthdate field is missing',
      cin: 'Please fill the form, CIN field is missing',
      validation: 'Please try again, you have somme incorrect submissions',
      accountAlreadyActivated: 'The account is already activated',
      usernameUsed: 'The username is already used',
      emailUsed: 'The email is already used',
      invalidEmail: 'The email is invalid',
      invalidUsername: 'The username is invalid',
      invalidFirstName: 'The first name is invalid',
      invalidLastName: 'The last name is invalid',
      invalidValue: 'The value is invalid',
      invalidToken: 'The token is invalid',
      missingID: 'Missing parameters, user id is required',
      missingUsername: 'Missing parameters, username is required',
      missinParams: 'Missing parameters, some fields are required',
      invalidCredentials: 'Username or password is incorrect',
      passwordInvalid: 'The password is invalid',
      passwordConfirm: 'The password is not confirmed',
      passwordNotMatch: 'The password is not match',
      passwordTooShort: 'The password is too short',
      passwordConstraint: 'Password contraints not satisfied',
      accountResetError: 'Your password has not been reset',
      needToLogin: 'You need to login to access this page',
      needToLoginAPI: 'You need to login to access this resource',
      onlyAdminAllowed: 'Only admin can do this action',
      userNotFound: 'The user is not found!',
      emptyUserList: 'The user list is empty',
      noValuePassed:
        'Invalid request, please submit request with a value in parameter',
    },
    success: {
      accountActivated: 'Your account has been activated',
      passWordReset: 'Your password has been reset',
      registrationSuccess:
        'Your account is now created, connect ' +
        'to your account to finish the registration process',
      updateSuccess: 'Update succeed, you can now connect to your account',
      privateKeyUpdated: 'Your private key has been updated',
      accountUpdated: 'Your account has been updated',
    },
  },
  fr: {
    errors: {
      requiredFields: 'Veuillez remplir le formulaire, les champs manquants',
      missingPassword:
        'Veuillez remplir le formulaire, le champ mot de passe est manquant',
      username:
        "Veuillez remplir le formulaire, le champ nom d'utilisateur est manquant",
      email: 'Veuillez remplir le formulaire, le champ email est manquant',
      birthdate:
        'Veuillez remplir le formulaire, le champ date de naissance est manquant',
      cin: 'Veuillez remplir le formulaire, le champ CIN est manquant',
      validation: 'Veuillez réessayer, vous avez des erreurs de saisie',
      accountAlreadyActivated: 'Le compte est déjà activé',
      usernameUsed: "Le nom d'utilisateur est déjà utilisé",
      emailUsed: "L'email est déjà utilisé",
      invalidEmail: "L'email est invalide",
      invalidUsername: "Le nom d'utilisateur est invalide",
      invalidValue: 'La valeur est invalide',
      invalidToken: 'Le jeton est invalide',
      missingID: "Paramètres manquants, l'identifiant est requis",
      missingUsername: "Paramètres manquants, le nom d'utilisateur est requis",
      missinParams: 'Paramètres manquants, certains champs sont requis',
      invalidCredentials:
        "Le nom d'utilisateur ou le mot de passe est incorrect",
      passwordInvalid: 'Le mot de passe est invalide',
      passwordConfirm: "Le mot de passe n'est pas confirmé",
      passwordNotMatch: "Le mot de passe n'est pas correspondant",
      passwordTooShort: 'Le mot de passe est trop court',
      passwordConstraint:
        'Les contraintes de mot de passe ne sont pas satisfaites',
      accountResetError: "Votre mot de passe n'a pas été réinitialisé",
      needToLogin: 'Vous devez vous connecter pour accéder à cette page',
      needToLoginAPI:
        'Vous devez vous connecter pour accéder à cette ressource',
      onlyAdminAllowed: "Seul l'administrateur peut faire cette action",
      userNotFound: "L'utilisateur n'est pas trouvé!",
      emptyUserList: "La liste d'utilisateurs est vide",
      noValuePassed:
        'Requête invalide, veuillez soumettre une requête avec une valeur dans le paramètre',
    },
    success: {
      accountActivated: 'Votre compte a été activé',
      passWordReset: 'Votre mot de passe a été réinitialisé',
      registrationSuccess:
        "Votre compte a été créé, connectez vous à votre compte pour terminer le processus d'inscription",
      updateSuccess:
        'Mise à jour réussie, vous pouvez maintenant vous connecter à votre compte',
      privateKeyUpdated: 'Votre clé privée a été mise à jour',
      accountUpdated: 'Votre compte a été mis à jour',
    },
  },
};

export const getAuthErrorMessage = (errorName, lang = 'en') =>
  messages[lang].errors[errorName];

export const getAuthSuccessMessage = (successName, lang = 'en') =>
  messages[lang].success[successName];
