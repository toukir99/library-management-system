import registerUser from '../../controllers/authControllers/registerUser';
import registerAdmin from '../../controllers/authControllers/registerAdmin';
import { Router } from 'express';
import loginAdmin from '../../controllers/authControllers/loginAdmin';
import loginUser from '../../controllers/authControllers/loginUser';
import validateAuth from '../../middlewares/authMiddleware.ts/validateAuth';
import validateAdminProfile from '../../middlewares/authMiddleware.ts/validateAdminProfile';
import validateUserProfile from '../../middlewares/authMiddleware.ts/validateUserProfile';


const authRoutes = Router();

authRoutes.post('/admin/register', validateAdminProfile, registerAdmin); 
authRoutes.post('/admin/login', validateAuth, loginAdmin);
authRoutes.post('/user/register', validateUserProfile, registerUser);
authRoutes.post('/user/login', validateAuth, loginUser);

export default authRoutes;