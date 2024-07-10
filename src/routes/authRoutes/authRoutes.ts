import { registerUser, registerUserPage } from '../../controllers/authControllers/registerUser';
import { registerAdmin, registerAdminPage } from '../../controllers/authControllers/registerAdmin';
import { Router } from 'express';
import {loginAdmin, loginAdminPage} from '../../controllers/authControllers/loginAdmin';
import { loginUser, loginUserPage } from '../../controllers/authControllers/loginUser';
import validateAuth from '../../middlewares/authMiddleware.ts/validateAuth';
import validateAdminProfile from '../../middlewares/authMiddleware.ts/validateAdminProfile';
import validateUserProfile from '../../middlewares/authMiddleware.ts/validateUserProfile';
import verifyAuthToken from '../../middlewares/authMiddleware.ts/verifyAuthToken';
import logoutUser from '../../controllers/authControllers/logoutUser';
import logoutAdmin from '../../controllers/authControllers/logoutAdmin';


const authRoutes = Router();

authRoutes.get('/admin/register', registerAdminPage);
authRoutes.post('/admin/register', validateAdminProfile, registerAdmin);
authRoutes.get('/admin/login', loginAdminPage); 
authRoutes.post('/admin/login', validateAuth, loginAdmin);
authRoutes.post('/admin/logout', verifyAuthToken, logoutAdmin);
authRoutes.post('/user/register', validateUserProfile, registerUser);
authRoutes.get('/user/register', registerUserPage);
authRoutes.post('/user/login', validateAuth, loginUser);
authRoutes.get('/user/login', loginUserPage);
authRoutes.post('/user/logout', verifyAuthToken, logoutUser);

export default authRoutes;