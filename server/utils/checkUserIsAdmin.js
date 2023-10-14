import jwt from "jsonwebtoken";
import User from "../models/User.js";

export default async (req, res, next) => {
  const token = (req.headers.authorization || "").replace(/Bearer\s?/, "");

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.SECRET);

      const user = await User.findById(decoded);

      if (user.role.toLowerCase() === "admin") {
        next();
      } else {
        return res.json({
          message: "You are not admin",
        });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: "Failed to check your role",
      });
    }
  } else {
    return res.status(500).json({
      message: "Failed to check your role",
    });
  }
};
