const status = ['ACTIVE', 'COMPLETED', 'DELETED', 'ON_HOLD', 'ARCHIVED'];

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable('tasks', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      content: {
        type: DataTypes.STRING,
      },
      author_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      dueDate: {
        type: DataTypes.DATE,
      },
      status: {
        type: DataTypes.ENUM(status),
      },
      isPinned: {
        type: DataTypes.BOOLEAN,
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
    return queryInterface.dropTable('tasks');
  },
};
