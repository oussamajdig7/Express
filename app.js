const express = require('express');
const data = require('./data.json');

const app = express();
const port = 5000;

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/users', (req, res) => {
    res.json(data);
});

app.get('/users/:id', (req, res) => {
    const { id } = req.params;
    const user = data.find(u => u.id === id);
    res.json(user);
});

app.get('/users/group/:group', (req, res) => {
    const { group } = req.params;
    const users = data.filter(u => u.group === group);
    res.json(users);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});