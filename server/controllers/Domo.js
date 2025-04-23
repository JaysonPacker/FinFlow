const models = require("../models");

const { Domo } = models;

const makerPage = (req, res) => res.render("app");

const publicPage = (req, res) => res.render("public");

const makeDomo = async (req, res) => {
  if (!req.body.name || !req.body.color || !req.body.age) {
    return res.status(400).json({ error: "All fields are required!" });
  }

  const domoData = {
    name: req.body.name,
    color: req.body.color,
    age: req.body.age,
    isPublic: req.body.isPublic,
    owner: req.session.account._id,
  };

  try {
    const newDomo = new Domo(domoData);
    await newDomo.save();
    return res.status(201).json({
      name: newDomo.name,
      age: newDomo.age,
      color: newDomo.color,
      isPublic: newDomo.isPublic,
    });
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
    const docs = await Domo.find(query)
      .populate({ path: "owner", select: "-_id username" })
      .lean()
      .exec();

    return res.json({ domos: docs });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Error fetching Domos" });
  }
};

const getPublicDomos = async (req, res) => {
  try {
    const query = { isPublic: true };
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
  getPublicDomos,
  publicPage,
};
