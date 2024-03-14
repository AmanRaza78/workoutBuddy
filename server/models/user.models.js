import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

userSchema.statics.signup = async (username, email, password) => {
  if (!username || !email || !password) {
    throw Error("All fields are required");
  }

  if (!validator.isEmail(email)) {
    throw Error("Not a valid email");
  }

  if (!validator.isStrongPassword(password)) {
    throw Error("Not a strong password");
  }

  const isUserExist = await User.findOne({ username });
  const isEmailExist = await User.findOne({ email });

  if (isUserExist || isEmailExist) {
    throw Error("User or Email already exist");
  }

  const salt = await bcrypt.genSalt(10);
  
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({ username, email, password: hashedPassword });

  return user;
};

userSchema.statics.login = async (email, password) => {
  if (!email || !password) {
    throw Error("Email or password is missing");
  }
  const user = await User.findOne({ email });

  if (!user) {
    throw Error("Wrong Email");
  }

  const isValidPasswod = await bcrypt.compare(password, user.password);

  if (!isValidPasswod) {
    throw Error("Wrong Password");
  }

  return user;
};

export const User = mongoose.model("User", userSchema);
