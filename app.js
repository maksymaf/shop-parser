const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');
const path = require('path');
const cors = require('cors');

const PORT = 3000;
const app = express();

app.use(cors({origin: `http://localhost:${PORT}`}));
app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
    return res.status(200).sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/api/scrape', async (req, res) => {
    const { url } = req.body;
    try{

        const response = await axios.get(url);
        const html = response.data;
        const $ = cheerio.load(html);

        const productTitle = $('h1._3Trjq').text();
        const productLogo = $('img.gCAIM').attr('src');
        let productPrice = $('div.tqUsL div.bkjEo span.yzKb6').text();
        
        productPrice = parseInt(productPrice.split(' ').join(''));

        return res.status(200).json({
            productTitle,
            productLogo,
            productPrice
        });

    }catch(error){
        return res.status(500).json({message: error.message});
    }
});

app.listen(PORT, () => {
    console.log(`Server has been started successfuly ${PORT}`);
});
