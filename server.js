const express = require('express');
const connectDB = require('./config/db');
const morgan = require('morgan');
const cors = require('cors');
const passport = require('passport');
const users = require('./routes/api/users');
const posts = require('./routes/api/posts');
const profile = require('./routes/api/profile');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));

connectDB();

// Passport middleware
app.use(passport.initialize());

// Passport Config
require('./config/passport')(passport);
// Use Routes
app.use('/api/users', users);
app.use('/api/posts', posts);
app.use('/api/profile', profile);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
