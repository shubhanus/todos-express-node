import { User } from "../models";
import { successResponse, errorResponse, decodeJwtToken } from "../helpers";

const apiAuth = async (req, res, next) => {
  const { authorization: token } = req.headers;
  if (!token) {
    return errorResponse(req, res, "Token is not provided", 401);
  }
  try {
    const decodedUser = decodeJwtToken(token.split(" ")[1]);
    const user = await User.scope("withSecretColumns").findOne({
      where: {
        email: decodedUser.user.email,
      },
    });
    if (!user) {
      errorResponse(req, res, "User not found", 401);
    }
    const reqUser = {
      ...user.get(),
      isAdmin: user.isAdmin(),
    };
    req.user = reqUser;
    return next();
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

export default apiAuth;
