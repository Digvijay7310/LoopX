import express from 'express';
import { adminLogin, adminLogout, adminRegister, getAllUser, myProfile, searchUsers, userBlock, userDelete, userDetails, users, userUnBlock } from '../controllers/admin.controller.js';
import {verifyToken} from '../middlewares/verify.middleware.js'
import { isAdmin } from '../middlewares/admin.middleware.js';
const router = express.Router();

router.get("/search", verifyToken, isAdmin, searchUsers)
router.post("/signup", adminRegister)
router.post("/login", adminLogin)
router.post("/logout", verifyToken, isAdmin, adminLogout)
router.get("/me", verifyToken, isAdmin, myProfile)
router.get("/all-users", verifyToken, isAdmin, getAllUser)
router.get("/users", verifyToken, isAdmin, users)
router.get(`/:username`, verifyToken, isAdmin, userDetails)
router.post(`/:username/block`, verifyToken, isAdmin, userBlock)
router.post(`/:username/unblock`, verifyToken, isAdmin, userUnBlock)
router.delete(`/:username/delete`, verifyToken, isAdmin, userDelete)

export default router