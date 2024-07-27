const express = require('express');
const session = require('express-session');
//const connectDB = require('./config/mongoDB');
//const User = require('./models/User');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5000;


// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../frontend/build')));

//-->Config the session users
app.use(session({
  secret: 'your-secret-key', 
  resave: false,             
  saveUninitialized: false,  
  cookie: {
    maxAge: 1000 * 60 * 60 * 24,  // 1 day (in milliseconds)
    secure: false,                // Set to true if using HTTPS
  }
}));

app.listen(PORT, () => {
  console.log(`--------------Shopify Server-----------------`);
  console.log(`Server is running on http://localhost:${PORT}`);
});

app.get('/HelloWorld', (req, res) => {
  res.send('Hello from the backend!');
});






// Connect to MongoDB
//connectDB();

// Create a route to handle user creation
const users = [{'username' : 'daniel' , 'email' : 'daniel@n-k.org.il' , 'country' : 'usa' , 'birthday': Date.now() , 'isAdmin' : true}]
const listitem  = [{'name': 'iphone 4' , 'price': '11$' , 'category' : 'tv'} , {'name': 'iphone x pro', 'price': '11$' , 'category' : 'smartphone'} , {'name': 'iphone 11', 'price': '11$' , 'category' : 'smartphone'} , {'name': 'iphone 11', 'price': '11$', 'category' : 'smartphone'} , {'name': 'iphone 11', 'price': '11$' ,'category' : 'tv'}]


// Create a route to get all users
app.get('/products', (req, res) => {
  try {
    const category = req.query.category;
    let filteredItems;
    if (category) {
      filteredItems = listitem.filter(item => item.category === category.toLowerCase());
    } else {
      filteredItems = listitem;
    }

    res.status(200).send(filteredItems);
  } catch (err) {
    res.status(500).send('An error occurred while fetching products.');
  }
});


app.get('/login', (req, res) => {
  try {
    req.session.user = users[0];
    res.status(200).send('User logged in');
  } catch (err) {
    res.status(500).send('Username Or Password Invalid');
  }
});

app.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.send('Error logging out');
    }
    res.clearCookie('connect.sid');
    res.send('Logged out');
  });
});