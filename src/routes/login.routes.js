import { Router } from 'express';
import { login, logout, register } from '../controller/login.controller.js';
//import { authRequired } from '../middlewares/validateToken.js'
import { validatingSchema } from '../middlewares/validator.middlewares.js';
import { loginSchema, registerSchema } from '../schemas/validate.schema.js';

const router = Router();

// Rutas públicas
router.post('/register', validatingSchema(registerSchema), register);
router.post('/login', validatingSchema(loginSchema), login);
router.post('/logout', logout);
// router.get('/profile', authRequired, profile);

export default router;