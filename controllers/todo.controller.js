const { User, Todo } = require("../models");

const create = async (req, res) => {
  const { userId, text } = req.body;
  // FIXME: get user id from JWT token
  try {
    const user = await User.scope("withSecretColumns").findOne({
      where: {
        uid: userId,
      },
    });

    const todo = await Todo.create({
      text,
      userId: user.id,
    });

    return res.status(201).json({ id: todo.uid });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

const getAllByUser = async (req, res) => {
  const { userId } = req.params;
  //TODO: validate userId
  // console.log(req);
  try {
    const user = await User.scope("withSecretColumns").findOne({
      where: {
        uid: userId,
      },
    });
    const todos = await Todo.findAll({
      where: {
        userId: user.id,
      },
      // include: [{ model: User, as: "user" }], // FIXME
    });
    return res.json(todos);
    ƒ;
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

module.exports = { create, getAllByUser };
