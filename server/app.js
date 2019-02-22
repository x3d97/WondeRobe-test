const express = require('express'),
   bodyParser = require('body-parser'),
   cors = require('cors'),
   mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/test").then(
   () => { console.log('Database connection is successful') },
   err => { console.log('Error when connecting to the database' + err) }
);
const app = express();

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(cors());

const port = process.env.PORT || 4000;

app.listen(port, () => {
   console.log('Listening on http://localhost:' + port);
});
