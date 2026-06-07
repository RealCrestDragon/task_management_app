const status = ['ACTIVE', 'COMPLETED', 'DELETED', 'ON_HOLD', 'ARCHIVED'];

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable('subtasks', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      task_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'tasks',
          key: 'id',
        },
      },
      author_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      content: {
        type: DataTypes.STRING,
      },
      due_date: {
        type: DataTypes.DATE,
      },
      status: {
        type: DataTypes.ENUM(status),
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
    return queryInterface.dropTable('subtasks');
  },
};
