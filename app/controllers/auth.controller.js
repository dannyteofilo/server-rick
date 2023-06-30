import { response } from "express";
import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { generateToken } from "../helpers/common.js";

export const login = async (req, res = response) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({
        error: {
          errors: [
            {
              msg: "user or password not exist - status: not found",
            },
          ],
        },
      });

    if (!user.status)
      return res.status(400).json({
        error: {
          errors: [
            {
              msg: "user or password not exist - status: not found",
            },
          ],
        },
      });

    const validPassword = bcryptjs.compareSync(password, user.password);

    if (!validPassword)
      return res.status(400).json({
        error: {
          errors: [
            {
              msg: "user or password is incorrect",
            },
          ],
        },
      });
    const data = {
      name: user.name,
      email: user.email,
      role: user.role,
      active: user.active,
    };
    const token = await generateToken({ data });
    res.json({ user, token });
  } catch (error) {
    return res.status(500).json({ msg: "contact support" });
  }
};

export const register = async (req, res = response) => {
  const { name, email, password, role } = req.body;
  const user = new User({ name, email, password, role });

  //Encriptar password
  const salt = bcryptjs.genSaltSync();
  user.password = bcryptjs.hashSync(password, salt);

  // save
  await user.save();
  const data = {
    name: user.name,
    email: user.email,
    role: user.role,
    active: user.active,
  };
  const token = await generateToken({ data });
  res.json({ user, token });
};
