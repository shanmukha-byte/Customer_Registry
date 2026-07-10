const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Local Connection (Changes to Atlas URI if needed)
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/customerDB';
mongoose.connect(mongoURI)
    .then(() => console.log('✅ MongoDB connected successfully'))
    .catch(err => console.error('❌ MongoDB connection error:', err));

// Import Schema
const Customer = require('./customerSchema');

// --- REST API ENDPOINTS ---

// 1. CREATE a new customer
app.post('/api/customers', async (req, res) => {
    try {
        const newCustomer = new Customer(req.body);
        const savedCustomer = await newCustomer.save();
        res.status(201).json(savedCustomer);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// 2. READ all customers
app.get('/api/customers', async (req, res) => {
    try {
        const customers = await Customer.find();
        res.status(200).json(customers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// 3. UPDATE a customer
app.put('/api/customers/:id', async (req, res) => {
    try {
        const updatedCustomer = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedCustomer);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// 4. DELETE a customer
app.delete('/api/customers/:id', async (req, res) => {
    try {
        await Customer.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Customer deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});