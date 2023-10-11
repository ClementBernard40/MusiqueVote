const express = require('express');
const app = express();
const port = 3000;
const host = '0.0.0.0';

const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/apinode");

app.use(express.urlencoded());
app.use(express.json());


const musicRoute = require('./routes/musiqueRoute');
// const commentRoute = require('./routes/commentRoute');

app.use('/musics', musicRoute);
// app.use('/', commentRoute);


app.listen(port, host);