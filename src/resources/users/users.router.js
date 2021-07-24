import { Router } from 'express';

import {
  activateOneAccount,
  // createOneUser,
  getOneUserData,
  getUserById,
} from './users.controllers';
import { User } from './users.model';

const router = Router();

router.route('/').get(getUserById(User)).post(activateOneAccount(User));

/* GET users listing. */
router.route('/:userName').get(getOneUserData(User));
// .put(activateOneAccount)
// .post(createOneUser);

// router.route('/:userName').get(getOneUserData);

export default router;
