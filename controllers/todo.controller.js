const { successResponse, errorResponse } = require("../helpers");
const { User, Todo } = require("../models");

const create = async (req, res) => {
  const {
    body: { text },
    user,
  } = req;

  try {
    const todo = await Todo.create({
      text,
      userId: user.id,
    });

    return res.status(201).json({ msg: "created successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

const getAllByUser = async (req, res) => {
  const { user } = req;
  //TODO: validate userId
  // console.log(req);
  try {
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

const updateTodo = async (req, res) => {
  const {
    user,
    params: { id: todoId },
    body: { text, status },
  } = req;

  try {
    const todo = await Todo.findOne({
      where: {
        id: todoId,
        userId: user.id,
      },
    });

    if (!todo) {
      return errorResponse(req, res, "Invalid todo id", 404);
    }

    if (text) {
      todo.text = text;
    }
    if (status) {
      todo.status = status;
    }

    await todo.save();

    return successResponse(req, res, { msg: "Updated successfully" });
  } catch (error) {
    errorResponse(req, res);
  }
};

module.exports = { create, getAllByUser, updateTodo };
