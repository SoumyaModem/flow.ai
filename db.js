// db.js
const { Sequelize, DataTypes } = require('sequelize');

// Initialize SQLite connection
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',
});

// Define the Transaction model
const Transaction = sequelize.define('Transaction', {
  type: {
    type: DataTypes.ENUM('income', 'expense'),
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

// Define the Category model
const Category = sequelize.define('Category', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: DataTypes.ENUM('income', 'expense'),
    allowNull: false,
  },
});

// Sync database models
sequelize.sync()
  .then(() => console.log("Database synced"))
  .catch(err => console.error("Error syncing database", err));

module.exports = {
  sequelize,
  Transaction,
  Category,
};
