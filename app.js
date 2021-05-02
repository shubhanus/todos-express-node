const express = require("express");
const { sequelize, User, Todo } = require("./models");

const app = express();

app.use(express.json());

app.post("/user", async (req, res) => {
  const { name, role } = req.body;

  try {
    const user = await User.create({
      name,
      role,
    });

    return res.status(201).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

app.get("/users", async (req, res) => {
  try {
    const users = await User.findAll();
    return res.json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

app.post("/todo", async (req, res) => {
  const { userId, text } = req.body;
  // FIXME: get user id from JWT token
  try {
    const todo = await Todo.create({
      text,
      userId,
    });

    return res.status(201).json(todo);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

app.get("/todos/:userId", async (req, res) => {
  const { userId } = req.params;
  //TODO: validate userId
  // console.log(req);
  try {
    const todos = await Todo.findAll({
      where: {
        userId,
      },
    });
    return res.json(todos);
    ƒ;
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

const port = 5000;
app.listen({ port }, async () => {
  console.log(`server started at ${port}`);
  await sequelize.authenticate();
  console.log(`Database started`);
});
