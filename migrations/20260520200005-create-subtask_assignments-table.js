module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable('subtask_assignments', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      subtask_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'subtasks',
          key: 'id',
        },
      },
      assignee_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      role: {
        type: DataTypes.STRING,
      },
      created_at: {
        type: DataTypes.DATE,
      },
      updated_at: {
        type: DataTypes.DATE,
      },
      deleted_at: {
        type: DataTypes.DATE,
      },
    });
  },
  down: (queryInterface, DataTypes) => {
    return queryInterface.dropTable('subtask_assignments');
  },
};
