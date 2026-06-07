module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable('tags', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
      },
      color: {
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
    return queryInterface.dropTable('tags');
  },
};
