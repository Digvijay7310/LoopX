import express from 'express';
import { adminLogin, adminRegister, getAllUser } from '../controllers/admin.controller.js';

const router = express.Router();

router.post("/signup", adminRegister)
router.post("/login", adminLogin)
router.get("/all-users", getAllUser)

export default router