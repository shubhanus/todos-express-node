const { sequelize, User, Todo } = require("../models");

const user = {
  create: async (req, res) => {
    const { name, role, password, email } = req.body;

    try {
      const user = await User.create({
        name,
        role,
        password,
        email,
      });
      //TODO: check if we can exclude in create queries as well id and password

      return res.status(201).json({ id: user.uid });
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },
  getAll: async (req, res) => {
    try {
      const users = await User.findAll();
      //TODO: check if we can exclude in create queries as well id and password
      return res.json(users);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },
};

module.exports = user;
