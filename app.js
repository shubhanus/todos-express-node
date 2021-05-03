const express = require("express");
const { sequelize } = require("./models");
const userController = require("./controllers/user.controller");
const todoController = require("./controllers/todo.controller");

const app = express();

app.use(express.json());

//Routes
app.post("/user", userController.create);
app.get("/users", userController.getAll);
app.post("/todo", todoController.create);
app.get("/todos/:userId", todoController.getAllByUser);

const port = 5000;
app.listen({ port }, async () => {
  console.log(`server started at ${port}`);
  await sequelize.authenticate();
  console.log(`Database started`);
});
