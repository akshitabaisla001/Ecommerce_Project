// src/services/user.service.ts
import UserModel from '../model/user.model';

export const getUserProfile = async (userId: string) => {
  const user = await UserModel.findById(userId).select('-password');
  if (!user) throw new Error('User not found');
  return user;
};
