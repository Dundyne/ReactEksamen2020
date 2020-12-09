import express from 'express';
import { authController } from '../controllers/index.js';
import { isAuthenticated } from '../middleware/auth.js';
import { validateFields } from '../middleware/validate.js';
//import { loginSchema } from '../schemas/user.js';

const router = express.Router();

router.post('/register', authController.register);
router.post('/login',  authController.login);// validateFields(loginSchema), 
router.post('/logout', authController.logout);
router.get('/me', isAuthenticated, authController.currentUser);//isAuthenticated, 
//router.post('/sendMail', authController.sendMail);
export default router;
