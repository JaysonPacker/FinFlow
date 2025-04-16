const models = require("../models");

const { Account } = models;

const loginPage = (req, res) => res.render("login");

const logout = (req, res) => {
  req.session.destroy();
  res.redirect("/");
}; // Redirect to login page on logout

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
    return res.json({ redirect: "/maker" }); // Redirect to login page on logout
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
    return res.json({ redirect: "/maker" }); // Redirect to maker page on successful signup
  } catch (err) {
    if (err.code === 11000) {
      // Duplicate username error
      return res.status(400).json({ error: "Username already exists!" });
    }
    return res.status(500).json({ error: "An error occurred" });
  }
};

module.exports = {
  loginPage,
  logout,
  login,
  signup,
};
