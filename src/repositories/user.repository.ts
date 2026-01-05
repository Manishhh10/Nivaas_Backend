import { UserModel } from '../models/user.model';
import { IUser } from '../types/user.type';

export const findUserByEmail = (email: string) => {
  return UserModel.findOne({ email });
};

export const findUserByPhone = (phoneNumber: string) => {
  return UserModel.findOne({ phoneNumber });
};

export const createUser = (data: IUser) => {
  return UserModel.create(data);
};
