const models = require("../models");

const { Domo } = models;

const makerPage = (req, res) => {
  return res.render("app");
};

const makeDomo = async (req, res) => {
  if (!req.body.name || !req.body.age) {
    return res.status(400).json({ error: "All fields are required!" });
  }

  const domoData = {
    name: req.body.name,
    age: req.body.age,
    owner: req.session.account._id,
  };

  try {
    const newDomo = new Domo(domoData);
    await newDomo.save();
    return res.status(201).json({ name: newDomo.name, age: newDomo.age });
  } catch (err) {
    console.log(`error${err}`);
    if (err.name === 11000) {
      return res.status(400).json({ error: "Domo already exists" });
    }
    return res
      .status(500)
      .json({ error: "An error occurred while creating the Domo." });
  }
};

const getDomos = async (req, res) => {
  try {
    const query = { owner: req.session.account._id };
    const docs = await Domo.find(query).select("name age").lean().exec();

    return res.json({ domos: docs });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Error fetching Domos" });
  }
};

module.exports = {
  makerPage,
  makeDomo,
  getDomos,
};
