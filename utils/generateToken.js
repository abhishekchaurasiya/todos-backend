/// Generate tokens
import jwt from "jsonwebtoken";

const generateToken = async (user) => {
  const payload = {
    _id: user._id,
    user_name: user.user_name,
    email: user.email,
  };
  return jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: "1h" });
};

export default generateToken;
