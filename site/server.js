const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const path = require('path'); // Added path module
const app = express();
const port = 3000;

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/translate', (req, res) => {
    const { sourceLanguage, targetLanguage, textInput } = req.body;

    const translationOptions = {
        method: 'POST',
        url: 'https://text-translator2.p.rapidapi.com/translate',
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'X-RapidAPI-Key': 'XXX', // Replace with your actual API key
            'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
        },
        form: {
            source_language: sourceLanguage,
            target_language: targetLanguage,
            text: textInput
        }
    };

    request(translationOptions, function (error, response, body) {
        if (error) {
            console.error('Error during translation request:', error);
            res.status(500).json({ error: 'Translation request failed' });
        } else if (response.statusCode === 200) {
            const translationResult = JSON.parse(body).data.translatedText;

            // Instead of redirecting on the client side, send a response to the client
            // with the translation result and let the client handle the display
            res.json({ translationResult });
        } else {
            console.error('Translation API error:', response.statusCode, body);
            res.status(response.statusCode).json({ error: 'Translation API error', message: body });
        }
    });
});

// Serve the results.html file
app.get('/results', (req, res) => {
    res.sendFile(path.join(__dirname, 'results.html'));
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
