const Users = require("../models/UserModel.js");

exports.SignUp = async (req, res) => {
  const { user_id, password } = req.body;

  try {
    const user = await Users.findOne({ user_id: user_id });
    if (user === null) {
      const newUser = new Users({ user_id: user_id, password: password });

      newUser.save()
        .then((savedUser) => {
          res.status(200).json({ success: true, user_id: user_id });
        })
        .catch((err) => {
          console.error('Error saving user:', err);
          res.status(500).json({ success: false, error: 'Database error' });
        });
    } else {
      return res.status(400).json({ success: false, error: "User already exists" });
    }

  } catch (err) {
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }

};

exports.SignIn = async (req, res) => {
  const { user_id, password } = req.body;

  try {
    const user = await Users.findOne({ user_id: user_id });
    if (user === null) {
      return res.status(404).json({ success: false, error: "User does not exist!" });
    } else {
      if (user.password === password) {
        return res.status(200).json({ success: true, user_id: user_id });
      } else {
        return res.status(200).json({ success: false, user_id: user_id });
      }
    }
  } catch (err) {
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
};



exports.DeleteAccount = async function (req, res) {
  const user_id = req.params.user_id;

  try {
    const user = await Users.findOne({ user_id: user_id });
    if (user === null) {
      return res.status(404).json({ success: false, error: "User does not exist!" });
    } else {
      await Users.deleteOne({ user_id: user_id });
      return res.status(200).json({ success: true, user_id: user_id });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
};




