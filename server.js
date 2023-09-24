const express = require('express');
const googleTTS = require('google-tts-api');
const axios = require('axios');
const fs = require('fs');

const app = express();

app.use(express.static('public'));
app.use(express.json());

app.post('/download', async (req, res) => {
    const text = req.body.text;
    const url = googleTTS.getAudioUrl(text, {
        lang: 'en',
        slow: false,
        host: 'https://translate.google.com',
    });

    const response = await axios({
        url,
        method: 'GET',
        responseType: 'stream',
    });

    const path = `${__dirname}/speech.mp3`;
    const writer = fs.createWriteStream(path);

    response.data.pipe(writer);

    writer.on('finish', () => {
        res.download(path);
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
