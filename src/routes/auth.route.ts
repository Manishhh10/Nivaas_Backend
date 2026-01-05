import { Router } from 'express';
import { register, login } from '../controller/auth.controller';
import { validate } from '../middlewares/zod.middleware';
import { registerDTO, loginDTO } from '../dtos/auth.dto';

const router = Router();

router.post('/register', validate(registerDTO), register);
router.post('/login', validate(loginDTO), login);

export default router;
