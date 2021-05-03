import { User } from '../models';
import {
  successResponse,
  errorResponse,
  getPasswordHash,
  getJwtSignedToken,
} from '../helpers';

export const create = async (req, res) => {
  const { name, password, email } = req.body;

  const secretePassword = getPasswordHash(password);

  try {
    await User.create({
      name,
      password: secretePassword,
      email,
    });
    // TODO: check if we can exclude in create queries as well id and password
    return successResponse(req, res, { msg: 'User created successfully' }, 201);
  } catch (error) {
    errorResponse(req, res);
  }
};

export const getAll = async (req, res) => {
  try {
    const users = await User.findAll();
    // TODO: check if we can exclude in create queries as well id and password
    return successResponse(req, res, users);
  } catch (error) {
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
