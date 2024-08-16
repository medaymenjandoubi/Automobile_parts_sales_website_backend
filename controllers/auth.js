// const sql = require('mssql');
const { hashPassword, comparePassword } = require('../utils/auth');
 const User =require('../models/auth')

const jwt = require('jsonwebtoken')
async function currentUser(req, res) {
    try {
      const user = await User.findById(req.auth._id).select("-password").exec();
      /* console.log("CURRENT_USER", user); */
      return res.json({ok: true});
    } catch (err) {
      console.log(err);
    }
  };


async function register (req, res) {
    try {
      // console.log(req.body);
      const { fullName, email, password } = req.body;
      // validation
      if (!fullName) return res.status(400).send("Name is required");
      if (!password || password.length < 6) {
        return res
          .status(400)
          .send("Password is required and should be min 6 characters long");
      }
      let userExist = await User.findOne({ email }).exec();
      if (userExist) return res.status(400).send("Email is taken");
  
      // hash password
      const hashedPassword = await hashPassword(password);
  
      // register
      const user = new User({
        name:fullName,
        email,
        password: hashedPassword,
      });
      await user.save();
      // console.log("saved user", user);
      return res.json({ ok: true });
    } catch (err) {
      console.log(err);
      return res.status(400).send("Error. Try again.");
    }  
}

async function login (req, res) {
    try {
      console.log(req.body);
      const { email, password } = req.body;
      // check if our db has user with that email
      const user = await User.findOne({ email }).exec();
      if (!user) return res.status(400).send("No user found");
      // check password
      const match = await comparePassword(password, user.password);
      if (!match) return res.status(400).send("Wrong password! Please Try Again.")
      // create signed jwt
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });
      // return user and token to client, exclude hashed password
      user.password = undefined;
      // send token in cookie
      res.cookie("token", token, {
        httpOnly: true,
        // secure: true, // only works on https
      });
      // send user as json response
      res.json(user);
    } catch (err) {
      console.log(err);
      return res.status(400).send("Error. Try again.");
    }
  };

async function logout(req,res){
    try {
        res.clearCookie("token")
        res.status(200).send('Logged out successfully');
      } catch (error) {
        console.log(error)
    }
}


module.exports = { register,login,logout,currentUser };
