import { Router} from 'express';
const router = Router();
import { login, register, logout, profile} from '../controllers/auth.controller.js';
import { authRequired } from '../middlewares/validateToken.js';
import {validateSchema} from "../middlewares/validator.js";
import { registerSchema, loginSchema } from "../schemas/auth.schemas.js";

router.post('/register', register);
router.post('/login', validateSchema(loginSchema), login);
router.post('/logout', logout);
router.get('/profile', authRequired, profile)

export default router;