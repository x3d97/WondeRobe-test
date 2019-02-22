const express = require('express'),
   bodyParser = require('body-parser'),
   cors = require('cors'),
   mongoose = require('mongoose');

const User = require('./models/User');
const Link = require('./models/Link')

mongoose.connect("mongodb://localhost:27017/test").then(
   () => { console.log('Database connection is successful') },
   err => { console.log('Error when connecting to the database' + err) }
);
const app = express();

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(cors());

app.post('/links/', async (req, res, next) => {
   try {
      let body = req.body;

      const user = new User({
         id: Math.floor(Math.random() * 100) // fixed count of users, just for test, because we have not regs
      });

      const userData = await user.save().then(user => user)
      //and if we have not regs, we use this bad logic
      body.userId = userData.id
      body.linkClicks = 0;

      const link = new Link(body);

      const links = await link.save()

      res.json(links)

   } catch (err) {
      next(err)
   }
});

const port = process.env.PORT || 4000;

app.listen(port, () => {
   console.log('Listening on http://localhost:' + port);
});
