import { Request, Response } from 'express';

const logoutUser = async (req: Request, res: Response): Promise<Response> => {
    res.clearCookie('auth_token');
    return res.status(200).json({ message: 'You have been logged out.' });
};

export default logoutUser;
