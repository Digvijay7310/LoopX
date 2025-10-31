import express from 'express';
import {
  adminLogin,
  adminLogout,
  adminRegister,
  getAllData,
  getAllUsers,
  myProfile,
  searchUsers,
  userBlock,
  userDelete,
  userDetails,
  userUnBlock,
} from '../controllers/admin.controller.js';
import { verifyToken } from '../middlewares/verify.middleware.js';
import { isAdmin } from '../middlewares/admin.middleware.js';
import { validate } from '../middlewares/validate.middlware.js';
import { adminLoginSchema, adminRegisterSchema } from '../validations/admin.validation.js';
const router = express.Router();

router.get('/search', verifyToken, isAdmin, searchUsers);
router.post('/signup', validate(adminRegisterSchema), adminRegister);
router.post('/login', validate(adminLoginSchema), adminLogin);
router.post('/logout', verifyToken, isAdmin, adminLogout);
router.get('/me', verifyToken, isAdmin, myProfile);
router.get('/all-users-data', verifyToken, isAdmin, getAllData);
router.get('/all-users', verifyToken, isAdmin, getAllUsers);
router.get(`/:username`, verifyToken, isAdmin, userDetails);
router.post(`/:username/block`, verifyToken, isAdmin, userBlock);
router.post(`/:username/unblock`, verifyToken, isAdmin, userUnBlock);
router.delete(`/:username/delete`, verifyToken, isAdmin, userDelete);

export default router;
