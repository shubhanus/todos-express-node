const TODO_STATUS_ENUM = Object.freeze({
  todo: 'todo',
  inProgress: 'inProgress',
  completed: 'completed',
});

const TODO_STATUS_ENUM_VALUES = Object.freeze(Object.values(TODO_STATUS_ENUM));

const USER_ROLES_ENUM = Object.freeze({
  admin: 'admin',
  user: 'user',
});

const USER_ROLES_ENUM_VALUES = Object.freeze(Object.values(USER_ROLES_ENUM));

module.exports = {
  TODO_STATUS_ENUM,
  TODO_STATUS_ENUM_VALUES,
  USER_ROLES_ENUM,
  USER_ROLES_ENUM_VALUES,
};
