import { User, Profile } from '../models';
import {
  successResponse,
  errorResponse,
  getPasswordHash,
  getJwtSignedToken,
} from '../helpers';
import * as profileController from './profile.controller';

export const create = async (req, res) => {
  const { name, password, email, phone } = req.body;

  const secretePassword = getPasswordHash(password);

  try {
    const user = await User.create({
      name,
      password: secretePassword,
      email,
    });
    const profile = await profileController.createProfile(phone, user.id);
    // TODO: check if we can exclude in create queries as well id and password
    return successResponse(
      req,
      res,
      {
        user,
        profile,
      },
      201,
    );
  } catch (error) {
    errorResponse(req, res);
  }
};

export const getAll = async (req, res) => {
  try {
    const users = await User.scope('').findAll({
      include: [{ model: Profile, as: 'profile' }],
    });
    // TODO: check if we can exclude in create queries as well id and password
    return successResponse(req, res, users);
  } catch (error) {
    console.log(error);
    errorResponse(req, res);
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.scope('withSecretColumns').findOne({
      where: { email },
    });
    if (!user) {
      return errorResponse(req, res, 'User not exist', 401);
    }
    const secretPassword = getPasswordHash(password);
    if (secretPassword !== user.password) {
      return errorResponse(req, res, 'Incorrect Password', 401);
    }
    const token = getJwtSignedToken({ userId: user.id, email: user.email });
    return successResponse(req, res, { token });
  } catch (error) {
    console.log(error);
    errorResponse(req, res);
  }
};

export const followUser = async (req, res) => {
  const {
    body: { followUserId },
    user,
  } = req;
  try {
    const currentUser = await User.findOne({
      where: { id: user.id },
    });
    const toFollowUser = await User.findOne({
      where: { id: followUserId },
    });
    // console.log(currentUser, toFollowUser);
    await currentUser.addUser(toFollowUser);
    successResponse(req, res, {
      msg: 'User Followed sucessfully',
      following: await currentUser.getUser(),
    });
  } catch (error) {
    console.log(error);
    errorResponse(req, res);
  }
};

export const getFollowers = async (req, res) => {
  const { user } = req;
  try {
    const currentUser = await User.findOne({
      where: { id: user.id },
    });
    const followers = await currentUser.getUser();
    successResponse(req, res, { followers });
  } catch (error) {
    console.log(error);
    errorResponse(req, res);
  }
};
