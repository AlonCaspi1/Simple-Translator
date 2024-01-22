const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const mysql = require('mysql');
const path = require('path');
const app = express();
const port = 3000;
const fs = require('fs');
const rapidApiKeyPath = path.join(__dirname, 'key.txt');
const rapidApiKey = fs.readFileSync(rapidApiKeyPath, 'utf8').trim();
const dotenv = require('dotenv');
require('dotenv').config({ path: '../Docker.env' });


app.use(bodyParser.json());

const pool = mysql.createPool({
    host: 'docker-mysql1',
    user: 'root',
    password: process.env.MYSQL_ROOT_PASSWORD,
    database: 'translations',
    connectionLimit: 10,
});


pool.on('error', (err) => {
    console.error('MySQL pool error:', err);
});

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
            'X-RapidAPI-Key': rapidApiKey,
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

            // Save the translation result to the MySQL database using the connection pool
            saveToDatabase(sourceLanguage, targetLanguage, textInput, translationResult);

            res.json({ translationResult });
        } else {
            console.error('Translation API error:', response.statusCode, body);
            res.status(response.statusCode).json({ error: 'Translation API error', message: body });
        }
    });
});

app.get('/results', (req, res) => {
    res.sendFile(path.join(__dirname, 'results.html'));
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

function saveToDatabase(sourceLanguage, targetLanguage, textInput, translationResult) {
    // Use the connection pool to execute the database query
    pool.getConnection((err, connection) => {
        if (err) {
            console.error('Error acquiring connection from pool:', err);
            return;
        }

        const sql = 'INSERT INTO requests (sourcelanguage, targetlanguage, textinput, textoutput) VALUES (?, ?, ?, ?)';
        const values = [sourceLanguage, targetLanguage, textInput, translationResult];

        connection.query(sql, values, (queryErr, result) => {
            connection.release(); // Release the connection back to the pool

            if (queryErr) {
                console.error('Error executing database query:', queryErr);
            } else {
                console.log('Translation result saved to the database');
            }
        });
    });
}
