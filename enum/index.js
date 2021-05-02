const TODO_STATUS_ENUM = {
  todo: "todo",
  inProgress: "inProgress",
  completed: "completed",
  getValues: function () {
    return Object.values(this);
  },
};

module.exports = {
  TODO_STATUS_ENUM,
};
