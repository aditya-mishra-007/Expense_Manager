const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Expense = require('../models/Expense');

// POST /api/expense (Add new)
// Change from '/expense' to '/'
router.post('/', auth, async (req, res) => {
  const { title, amount, category, date } = req.body;

  try {
    const expense = new Expense({
      user: req.user.id,
      title,
      amount,
      category,
      date: date || Date.now(),
    });

    await expense.save();
    res.status(201).json(expense);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/expense (Get all)
// Change from '/expenses' to '/'
router.get('/', auth, async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user.id }).sort({ date: -1 });
    res.json(expenses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE /api/expense/:id
// Change from '/expense/:id' to '/:id'
router.delete('/:id', auth, async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);

    if (!expense) return res.status(404).json({ message: 'Expense not found' });
    if (expense.user.toString() !== req.user.id)
      return res.status(401).json({ message: 'Not authorized' });

    await expense.deleteOne();
    res.json({ message: 'Expense removed' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;