const express = require("express");
const { sequelize, User, Todo } = require("./models");

const app = express();

app.use(express.json());

app.post("/user", async (req, res) => {
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
});

app.get("/users", async (req, res) => {
  try {
    const users = await User.findAll();
    //TODO: check if we can exclude in create queries as well id and password
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
});

app.get("/todos/:userId", async (req, res) => {
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
});

const port = 5000;
app.listen({ port }, async () => {
  console.log(`server started at ${port}`);
  await sequelize.authenticate();
  console.log(`Database started`);
});
