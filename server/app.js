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

app.get('/links/:userId', async (req, res, next) => {
   try {
      Link.find({ userId: req.params.userId }, (err, links) => {

         if (err) {
            console.log(err);
         }
         else {
            res.json(links);
         }
      });
   } catch (err) {
      next(err)
   }
});

app.post('/links/', async (req, res, next) => {
   try {
      let body = req.body;

      const user = new User({
         id: Math.floor(1 + Math.random() * 3) // fixed count of users, just for test, because we have not regs
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

app.patch('/links/:id', async (req, res, next) => {
   try {
      Link.findById(req.params.id, (err, link) => {
         if (!link)
            return next(new Error('Error getting the link!'));
         else {
            ++link.linkClicks
            link.save();
            res.json({ status: 'ok' });
         }
      });

   } catch (err) {
      next(err)
   }
});

const port = process.env.PORT || 4000;

app.listen(port, () => {
   console.log('Listening on http://localhost:' + port);
});
