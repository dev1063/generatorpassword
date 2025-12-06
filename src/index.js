const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const LOWERCASE = 'abcdefghijklmnopqrstuvwxyz';
const UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const NUMBERS = '0123456789';
const SYMBOLS = '!@#$%^&*()-_=+[]{};:,.<>/?';

app.post('/generate', (req, res) => {
    const { length, lowercase, uppercase, numbers, symbols } = req.body;

    let pool = '';
    if (lowercase) pool += LOWERCASE;
    if (uppercase) pool += UPPERCASE;
    if (numbers) pool += NUMBERS;
    if (symbols) pool += SYMBOLS;

    if (!pool.length) {
        return res.status(400).json({ error: "Selecciona al menos un tipo de caracter." });
    }

    let password = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * pool.length);
        password += pool[randomIndex];
    }

    res.json({ password });
});

app.listen(3001, () => console.log("Servidor corriendo en puerto 3001"));
