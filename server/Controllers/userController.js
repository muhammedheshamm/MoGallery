const User = require("../Models/userModel.js");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const maxAge = 24 * 60 * 60 ;

const register = async (req, res) => {
  try {
    const { username, password, isAdmin } = req.body;

    const exists = await User.findOne({ username });
    if (exists) {
      return res.json({ success: false, message: 'User already exists' });
    }
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      password : hashed,
      isAdmin
    });
    await newUser.save();
    return res.json({ success: true, message: 'Registered successfully' });

  } catch (error) {
    return res.json({ success: false,  message: 'An error occurred while registering'});
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.json({ success: false, message: 'Incorrect username' });
    }
    bcrypt.compare(password, user.password, function(err, result) {
      if (err) {
        return res.json({ success: false, message: 'An error occurred while logging in'});
      }
      if (result) {
        const token = createToken(user);
        res.json({
          success: true,
          message: 'Login successful',
          user : {
            username: user.username,
            isAdmin: user.isAdmin,
            token
          }
        })
      }
      else {
        return res.json({ success: false, message: 'Incorrect password' });
      }
    })

  } catch (error) {
    return res.json({ success: false, message: 'An error occurred while logging in'});
  }
};

const registerAdmin = async () => {
  try {
    const adminExists = await User.findOne({ isAdmin: true });
    if(adminExists){
      console.log('Admin already exists')
      return
    }
    const username = 'muhammed', password = '123'
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    const admin = new User({
      username,
      password : hashed,
      isAdmin: true
    });
    await admin.save();
    console.log('Admin registered successfully')

  } catch (error) {
    console.log('An error occurred while registering admin')
  }
};


const createToken = (user) => {
  return jwt.sign(
    { id: user._id,
      isAdmin: user.isAdmin,
      username: user.username
    },
    "secret",
    { expiresIn: "24h" }
  )
}

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const userToSend = {
      ...user._doc,
      password: undefined
    }
    res.json(userToSend);
  } catch (err) {
    res.json({ message: 'An error occurred while retrieving the user' });
    console.log(err.message)
  }
};

module.exports = {
  register,
  login,
  getUser,
  registerAdmin
};