const express = require('express');
const session = require('express-session');
const path = require('path');
const bodyParser = require('body-parser');
const db = require('./models/db');

const authRoutes = require('./routes/auth');
const postsRoutes = require('./routes/posts');
const adminRoutes = require('./routes/admin');

const kurvRoutes = require('./routes/kurv');

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// EJS view engine
app.set('view engine', 'ejs');

// Session setup
app.use(session({
  secret: 'ShadowEnergySecretKey',
  resave: false,
  saveUninitialized: false
}));

// Global user (til alle views)
app.use((req, res, next) => {
  res.locals.user = req.session.user;
  next();
});

// Routes
app.use(authRoutes);
app.use(postsRoutes);
app.use(kurvRoutes);
app.use(adminRoutes); // ← Admin skal sættes FØR app.listen()

// Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server kører på http://localhost:${PORT}`);
});


// ...
// ...

app.use(kurvRoutes); // Tilføj efter de andre routes

app.use(authRoutes);
app.use(postsRoutes);
app.use(adminRoutes); // ← Tilføj denne linje!
