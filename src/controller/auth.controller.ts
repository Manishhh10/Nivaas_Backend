import { Request, Response } from 'express';
import { registerUser, loginUser } from '../services/auth.service';

export const register = async (req: Request, res: Response) => {
  const user = await registerUser(req.body);
  res.status(201).json({ message: 'User registered', user });
};

export const login = async (req: Request, res: Response) => {
  const data = await loginUser(req.body);
  res.status(200).json({ message: 'Login successful', data });
};
