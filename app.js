import express from 'express';
import { sequelize } from './models';
import * as userController from './controllers/user.controller';
import * as todoController from './controllers/todo.controller';
import apiAuth from './middlewares/apiAuth';
import adminAuth from './middlewares/adminAuth';

const app = express();

// middleware
app.use(express.json());

// Routes
app.post('/user', userController.create);
app.post('/login', userController.login);

app.get('/users', apiAuth, adminAuth, userController.getAll);

app.post('/todo', apiAuth, todoController.create);
app.put('/todo/:id', apiAuth, todoController.updateTodo);
app.get('/todos', apiAuth, todoController.getAllByUser);

const port = 5000;
app.listen({ port }, async () => {
  console.log(`server started at ${port}`);
  await sequelize.authenticate();
  console.log('Database started');
});
