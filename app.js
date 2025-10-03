const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');
const path = require('path');
const cors = require('cors');

const PORT = 3000;
const app = express();

app.use(cors({origin: `http://localhost:${PORT}`}));
app.use(express.static('public'));

app.get('/', (req, res) => {
    return res.status(200).sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server has been started successfuly ${PORT}`);
});
