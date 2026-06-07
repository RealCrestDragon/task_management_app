module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable('task_tags', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      task_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'tasks',
          key: 'id',
        },
      },
      tag_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'tags',
          key: 'id',
        },
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
    return queryInterface.dropTable('task_tags');
  },
};
