import { Router } from 'express';

import {
  activateOneAccount,
  createOneUser,
  getOneUserData,
  getUserById,
} from './users.controllers';
import { User as UserModel } from './users.model';

const router = Router();

// handle GET && PUT (UPDATE) to /api/u/?id=:id&otherParams=:o
router
  .route('/')
  .get(getUserById(UserModel))
  .put(activateOneAccount(UserModel));

// handle POST to /api/u/create
router.route('/create').post(createOneUser(UserModel));

// handle GET, POST, UPDATE to /api/u/:userName
router.route('/:userName').get(getOneUserData(UserModel));

export default router;
