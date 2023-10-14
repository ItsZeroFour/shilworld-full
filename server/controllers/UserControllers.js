import UserModel from "../models/User.js";
import Token from "../models/Token.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { validationResult } from "express-validator";
import verifyEmail from "../utils/verifyEmail.js";
import crypto from "crypto";
import Code from "../models/Code.js";
import codeEmail from "../utils/codeEmail.js";
import resetPasswordEmail from "../utils/resetPasswordEmail.js";

dotenv.config();

const SECRET = process.env.SECRET;

export const createUser = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() });
    }

    /* HASH PASSWORD */
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const doc = new UserModel({
      nickname: req.body.nickname,
      email: req.body.email,
      password: hashPassword,
    });

    const user = await doc.save();

    const token = jwt.sign(
      {
        _id: user._id,
      },
      SECRET,
      { expiresIn: "30d" }
    );

    const userData = user._doc;

    res.json({ ...userData, token });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Failed to create user",
    });
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId);

    if (!user) {
      return res.status(404).send({
        message: "User not found",
      });
    }

    const { password, ...userData } = user._doc;

    res.json(userData);
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Failed to get user",
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() });
    }

    const user = await UserModel.findOne({ email: req.body.email });

    if (!user) {
      return res.status(400).json({
        message: "Wrong login or password",
      });
    }

    const isValidPassword = await bcrypt.compare(
      req.body.password,
      user._doc.password
    );

    if (!isValidPassword) {
      return res.status(400).json({
        message: "Wrong login or password",
      });
    }

    /* GENERATE NEW TOKEN AND GET USER */
    const token = jwt.sign(
      {
        _id: user._id,
      },
      SECRET,
      { expiresIn: "30d" }
    );

    const { password, ...userData } = user._doc;

    if (userData.TwoFA) {
      const userCode = await Code.findOne({ userId: user._id });

      if (!req.body.code) {
        res.status(200).json({
          ...userData,
          token,
          success: false,
        });
      }

      if (
        userCode.code === String(req.body.code) &&
        userCode.userId === userData._id.toString()
      ) {
        res.status(201).send({
          ...userData,
          token,
          success: true,
        });

        await Code.findOneAndDelete({ userId: user._id });
      } else {
        res.status(500).json({
          ...userData,
          token,
          success: false,
        });
      }
    } else {
      res.json({ ...userData, token });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Failed to login",
    });
  }
};

export const sendLetter = async (req, res) => {
  try {
    // Generate verification token
    const verificationToken = new Token({
      userId: req.userId,
      token: crypto.randomUUID().toString("hex"),
    });

    await verificationToken.save();

    // Send mail
    const link = `${process.env.API_URL}/user/confirm/${verificationToken.token}`;

    await verifyEmail(req.body.email, link);
    res.status(200).json({
      message: "Email send check your email",
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Failed to send letter",
    });
  }
};

export const send2FALetter = async (req, res) => {
  try {
    // Generate verification token
    const verificationToken = new Token({
      userId: req.userId,
      token: crypto.randomUUID().toString("hex"),
    });

    await verificationToken.save();

    // Send mail
    const link = `${process.env.API_URL}/user/confirm2FA/${verificationToken.token}`;

    await verifyEmail(req.body.email, link);
    res.status(200).json({
      message: "Email send check your email",
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Failed to send letter",
    });
  }
};

export const confirmEmail = async (req, res) => {
  try {
    const token = await Token.findOne({
      token: req.params.token,
    });

    await UserModel.updateOne(
      { _id: token.userId },
      { $set: { emailIsVerified: true } }
    );
    await Token.findByIdAndRemove(token._id);

    res.send("Почта верефецированна! Можете закрыть это окно");
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Failed to confirm email",
    });
  }
};

export const confirm2FA = async (req, res) => {
  try {
    const token = await Token.findOne({
      token: req.params.token,
    });

    await UserModel.updateOne({ _id: token.userId }, { $set: { TwoFA: true } });
    await Token.findByIdAndRemove(token._id);

    res.send("Двухфакторная аутемфикация подключена! Можете закрыть это окно!");
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Failed to confirm email",
    });
  }
};

export const sendCode = async (req, res) => {
  try {
    // Generate verification token
    const authCode = new Code({
      userId: req.body.userId,
      code: crypto.randomInt(1000, 9999),
    });

    await authCode.save();
    await codeEmail(req.body.email, authCode.code);

    res.status(200).json({
      message: "Email send check your email",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Failed to send code",
    });
  }
};

/* RESET PASSWORD */
export const resetPasswordTokenEmail = async (req, res) => {
  try {
    const email = req.body.email;

    const user = await UserModel.findOne({ email });

    if (!user)
      return res.status(404).json({
        message: "User not found",
      });

    // Generate verification token
    const resetPasswordToken = new Token({
      userId: user._id,
      token: crypto.randomUUID().toString("hex"),
    });

    await resetPasswordToken.save();

    // Send mail
    const link = `${process.env.CLIENT_API_URL}/forgot-password/update/${resetPasswordToken.token}`;

    await resetPasswordEmail(req.body.email, link);

    res.status(200).json({
      message: "Email send check your email",
    });
  } catch (err) {
    res.status(500).json({
      message: "Failed to reset password",
    });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const token = await Token.findOne({
      token: req.params.token,
    });

    /* HASH PASSWORD */
    const password = req.body.password;

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    await UserModel.updateOne(
      { _id: token.userId },
      { $set: { password: hashPassword } }
    );
    await Token.findByIdAndRemove(token._id);

    res.send("Seccessfully!");
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Failed to reset password",
    });
  }
};
