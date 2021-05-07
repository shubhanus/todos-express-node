/* eslint-disable import/prefer-default-export */
import { Profile } from '../models';

export const createProfile = async (phone, userId) => {
  try {
    const profile = await Profile.create({
      phone,
      userId,
    });
    return profile;
  } catch (error) {
    return error;
  }
};
