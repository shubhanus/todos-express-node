const express = require("express");
const { sequelize } = require("./models");
const userController = require("./controllers/user.controller");
const todoController = require("./controllers/todo.controller");
const apiAuth = require("./middlewares/apiAuth");
const adminAuth = require("./middlewares/adminAuth");

const app = express();

// middleware
app.use(express.json());

//Routes
app.post("/user", userController.create);
app.post("/login", userController.login);

app.get("/users", apiAuth, adminAuth, userController.getAll);

app.post("/todo", apiAuth, todoController.create);
app.put("/todo/:id", apiAuth, todoController.updateTodo);
app.get("/todos", apiAuth, todoController.getAllByUser);

const port = 5000;
app.listen({ port }, async () => {
  console.log(`server started at ${port}`);
  await sequelize.authenticate();
  console.log(`Database started`);
});
