const express = require('express');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/' , (req, res) => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    res.send(`<h1>Random Quote</h1><p>${quotes[randomIndex]}</p>`);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

const quotes = [
    "The best way to predict the future is to invent it. - Alan Kay",
    "Life is 10% what happens to us and 90% how we react to it. - Charles R. Swindoll",
    "The only way to do great work is to love what you do. - Steve Jobs",
    "If you can dream it, you can achieve it. - Zig Ziglar",
    "Success is not final, failure is not fatal: It is the courage to continue that counts. - Winston Churchill"
];