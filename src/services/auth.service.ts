import { findUserByEmail, createUser } from '../repositories/user.repository';
import { hashPassword, comparePassword } from '../utils/hash.util';
import { generateToken } from '../lib/jwt';
import { ApiError } from '../exceptions/api.error';

export const registerUser = async (payload: any) => {
  const existingUser = await findUserByEmail(payload.email);

  if (existingUser) {
    throw new ApiError('Email already exists', 409);
  }

  const hashedPassword = await hashPassword(payload.password);

  return createUser({
    email: payload.email,
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
    token: generateToken({ id: user._id, role: user.role }),
  };
};
