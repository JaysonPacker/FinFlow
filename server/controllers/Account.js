const models = require("../models");

const { Account } = models;

const logout = (req, res) => {
  req.session.destroy();
  res.json({ redirect: "/login" });
}; // Redirect to login page on logout

const verifyLogin = (req, res) => {
  if (req.session.account) {
    return res.status(200);
  }
  return res.json({ redirect: "/login" });
};
const login = (req, res) => {
  const username = `${req.body.username}`;
  const pass = `${req.body.pass}`;
  console.log("Attempting to log in with username:");
  if (!username || !pass) {
    return res.status(400).json({ error: "All fields required!" });
  }
  return Account.authenticate(username, pass, (err, account) => {
    if (err || !account) {
      console.log("Authentication failed:");
      return res.status(401).json({ error: "Invalid username or password!" });
    }
    req.session.account = Account.toAPI(account);
    return res.json({ redirect: "/home" }); // Redirect to login page on logout
  });
};

const signup = async (req, res) => {
  const username = `${req.body.username}`;
  const pass = `${req.body.pass}`;
  const pass2 = `${req.body.pass2}`;

  if (!username || !pass || !pass2) {
    return res.status(400).json({ error: "All fields are required!" });
  }
  if (pass !== pass2) {
    return res.status(400).json({ error: "Passwords do not match!" });
  }

  try {
    const hash = await Account.generateHash(pass);
    const newAccount = new Account({
      username,
      password: hash,
    });
    await newAccount.save();
    req.session.account = Account.toAPI(newAccount);
    return res.json({ redirect: "/home" }); // Redirect to maker page on successful signup
  } catch (err) {
    if (err.code === 11000) {
      // Duplicate username error
      return res.status(400).json({ error: "Username already exists!" });
    }
    return res.status(500).json({ error: "An error occurred" });
  }
};
const updatePassword = async (req, res) => {
  const { oldPass, newPass, newPass2 } = req.body;

  if (!oldPass || !newPass || !newPass2) {
    return res.status(400).json({ error: "All fields are required!" });
  }

  if (newPass !== newPass2) {
    return res.status(400).json({ error: "New passwords do not match!" });
  }

  try {
    account = await Account.findOne({
      _id: req.session.account._id,
    }).exec();
    if (!account) {
      return res.status(404).json({ error: "Account not found!" });
    }
    Account.authenticate(account.username, oldPass, (err, account) => {
      if (err || !account) {
        console.log("Authentication failed:");
        return res.status(401).json({ error: "Old password Invalid" });
      }
    });

    const newHash = await Account.generateHash(newPass);
    await Account.findOneAndUpdate({ _id: account._id }, { password: newHash });
    return res.json({ message: "Password updated successfully!" });
  } catch (err) {
    console.error("Password update error:", err);
    return res
      .status(500)
      .json({ error: "An error occurred while updating the password." });
  }
};

module.exports = {
  logout,
  login,
  signup,
  verifyLogin,
  updatePassword,
};
