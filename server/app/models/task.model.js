module.exports = (sequelize, Sequelize) => {
  const task = sequelize.define("tasks", {
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    status: {
      type: Sequelize.INTEGER,
      allowNull: false,
    }
  }, {
    paranoid: true, // Enable soft delete
    timestamps: true, // Ensure createdAt and updatedAt are enabled
  });

  return task;
};