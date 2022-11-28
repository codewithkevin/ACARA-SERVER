const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

//Stateic SingUp Method
userSchema.statics.signup = async function (email, password, name) {
  const exist = await this.findOne({ email });

  if (exist) {
    throw Error("Email Already Exist");
  }

  //Generate Salt
  const salt = await bcrypt.genSalt(10);

  //Hashing the password
  const hash = await bcrypt.hash(password, salt);

  //Create User
  const user = await this.create({ email, password: hash, name });

  return user;
};

userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("All fields must be filled");
  }

  const user = await this.findOne({ email });

  if (!user) {
    throw Error("Email Doesn' Exist");
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error("Incorrect password");
  }

  return user;
};

module.exports = mongoose.model("User", userSchema);
