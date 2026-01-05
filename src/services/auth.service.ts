import {
  findUserByEmail,
  findUserByPhone,
  createUser,
} from '../repositories/user.repository';
import { hashPassword, comparePassword } from '../utils/hash.util';
import { generateToken } from '../lib/jwt';
import { ApiError } from '../exceptions/api.error';

export const registerUser = async (payload: any) => {
  const emailExists = await findUserByEmail(payload.email);
  if (emailExists) {
    throw new ApiError('Email already exists', 409);
  }

  const phoneExists = await findUserByPhone(payload.phoneNumber);
  if (phoneExists) {
    throw new ApiError('Phone number already exists', 409);
  }

  const hashedPassword = await hashPassword(payload.password);

  return createUser({
    name: payload.name,
    email: payload.email,
    phoneNumber: payload.phoneNumber,
    password: hashedPassword,
    role: payload.role || 'user',
  });
};

export const loginUser = async (payload: any) => {
  const user = await findUserByEmail(payload.email);

  if (!user) {
    throw new ApiError('Invalid credentials', 401);
  }

  const isMatch = await comparePassword(payload.password, user.password);
  if (!isMatch) {
    throw new ApiError('Invalid credentials', 401);
  }

  return {
    token: generateToken({
      id: user._id,
      role: user.role,
    }),
  };
};
