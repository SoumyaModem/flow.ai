// server.js
const express = require('express');
const bodyParser = require('body-parser');
const { Transaction, Category } = require('./db');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// POST /transactions - Add a new transaction
app.post('/transactions', async (req, res) => {
  try {
    const { type, category, amount, date, description } = req.body;
    const transaction = await Transaction.create({ type, category, amount, date, description });
    res.status(201).json(transaction);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// GET /transactions - Retrieve all transactions
app.get('/transactions', async (req, res) => {
  const transactions = await Transaction.findAll();
  res.json(transactions);
});

// GET /transactions/:id - Retrieve a transaction by ID
app.get('/transactions/:id', async (req, res) => {
  const { id } = req.params;
  const transaction = await Transaction.findByPk(id);
  if (transaction) {
    res.json(transaction);
  } else {
    res.status(404).json({ error: 'Transaction not found' });
  }
});

// PUT /transactions/:id - Update a transaction by ID
app.put('/transactions/:id', async (req, res) => {
  const { id } = req.params;
  const { type, category, amount, date, description } = req.body;
  const transaction = await Transaction.findByPk(id);
  if (transaction) {
    await transaction.update({ type, category, amount, date, description });
    res.json(transaction);
  } else {
    res.status(404).json({ error: 'Transaction not found' });
  }
});

// DELETE /transactions/:id - Delete a transaction by ID
app.delete('/transactions/:id', async (req, res) => {
  const { id } = req.params;
  const transaction = await Transaction.findByPk(id);
  if (transaction) {
    await transaction.destroy();
    res.status(204).send();
  } else {
    res.status(404).json({ error: 'Transaction not found' });
  }
});

// GET /summary - Get a summary of income, expenses, and balance
app.get('/summary', async (req, res) => {
  try {
    const totalIncome = await Transaction.sum('amount', { where: { type: 'income' } });
    const totalExpense = await Transaction.sum('amount', { where: { type: 'expense' } });
    const balance = totalIncome - totalExpense;
    res.json({ totalIncome, totalExpense, balance });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
