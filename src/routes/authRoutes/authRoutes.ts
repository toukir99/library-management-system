import registerUser from '../../controllers/authControllers/registerUser';
import registerAdmin from '../../controllers/authControllers/registerAdmin';
import { Router } from 'express';


const authRoutes = Router();

authRoutes.post('/admin/register', registerAdmin);
// router.post('/admin/login', loginAdmin);
authRoutes.post('/user/register', registerUser);
// router.post('/user/login', loginUser);

export default authRoutes;