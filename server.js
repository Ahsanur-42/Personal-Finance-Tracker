const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Set up express app
const app = express();
app.use(bodyParser.json());
app.use(cors());  // Enable Cross-Origin Resource Sharing

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/finance_tracker', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('Connected to MongoDB');
})
.catch((err) => {
    console.log('Error connecting to MongoDB:', err);
});

// Create a schema for transactions
const transactionSchema = new mongoose.Schema({
    amount: Number,
    category: String,
    type: { type: String, enum: ['income', 'expense'] },
    date: { type: Date, default: Date.now },
});

const Transaction = mongoose.model('Transaction', transactionSchema);

// API route to add a transaction
app.post('/add-transaction', async (req, res) => {
    const { amount, category, type } = req.body;
    try {
        const newTransaction = new Transaction({ amount, category, type });
        await newTransaction.save();
        res.status(200).json({ message: 'Transaction added successfully' });
    } catch (err) {
        res.status(400).json({ message: 'Error adding transaction', error: err });
    }
});

// API route to get all transactions
app.get('/transactions', async (req, res) => {
    try {
        const transactions = await Transaction.find();
        res.status(200).json(transactions);
    } catch (err) {
        res.status(400).json({ message: 'Error fetching transactions', error: err });
    }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
