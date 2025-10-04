import express from 'express';
import { adminLogin, adminLogout, adminRegister, getAllUser, userBlock, userDelete, userDetails, users, userUnBlock } from '../controllers/admin.controller.js';
import {verifyToken} from '../middlewares/verify.middleware.js'
const router = express.Router();

router.post("/signup", adminRegister)
router.post("/login", adminLogin)
router.post("/logout", verifyToken, adminLogout)
router.get("/all-users", verifyToken, getAllUser)
router.get("/users", verifyToken, users)
router.get(`/:username`, verifyToken, userDetails)
router.post(`/:username/block`, verifyToken, userBlock)
router.post(`/:username/unblock`, verifyToken, userUnBlock)
router.delete(`/:username/delete`, verifyToken, userDelete)

export default router