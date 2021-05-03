import { errorResponse } from '../helpers';

const adminAuth = async (req, res, next) => {
  try {
    if (req.user && req.user.email && req.user.isAdmin) {
      return next();
    }
    errorResponse(req, res, { msg: 'User not authorized.' }, 403);
  } catch (error) {
    errorResponse(req, res);
  }
};

export default adminAuth;
