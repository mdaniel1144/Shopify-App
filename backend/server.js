const express = require('express');
const session = require('express-session');
const cors = require('cors');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5000;
const { connectDB } = require('./config/mongoDB');
const User = require('./models/User');
const Product = require('./models/Product');



app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.use(express.json());

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


// Connect to MongoDB
connectDB();

// Create a route to handle user creation
const users = [{'username' : 'admin' , 'password' : 'admin', 'email' : 'daniel@n-k.org.il' , 'country' : 'usa' , 'birthday': Date.now() , 'isAdmin' : true , 'isActive' : true}]
const listitem  = [{'name': 'iphone 4' , 'price': '11$' , 'category' : 'tv'} , {'name': 'iphone x pro', 'price': '11$' , 'category' : 'smartphone'} , {'name': 'iphone 11', 'price': '11$' , 'category' : 'smartphone'} , {'name': 'iphone 11', 'price': '11$', 'category' : 'smartphone'} , {'name': 'iphone 11', 'price': '11$' ,'category' : 'tv'}]

app.get('/HelloWorld', (req, res) => {
  res.send('Hello from the backend!');
});

// Create a route to get all users
app.get('/products', (req, res) => {
  try {
    const category = req.query.category
    let filteredItems;
    if (category) {
      filteredItems = listitem.filter(item => item.category === category.toLowerCase())
    } else {
      filteredItems = listitem;
    }

    res.status(200).send(filteredItems)
  } catch (err) {
    res.status(500).send('An error occurred while fetching products.');
  }
})


app.post('/session' , async (req, res) => {
  if (req.session.user) {
    console.log(`-->Login:\n   Exist Session: ${username}`)
    req.session.user = { username: user.username , email : 'daniel@n-k.org.il' , country : 'usa' , birthday: Date.now() , 'isAdmin' : true};
    res.status(200).json({ user: req.session.user })
  } else {
    res.status(401).send('Please login first');
  }
});


app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username }).exec();
    //const user = users.find(u => u.username === username && u.password === password && u.isActive)
    if (!user) {
      return res.status(401).send('Username or Password is Invalid');
    }
    if(user.password === password && user.isActive){
      console.log(`-->Login:\n   Trying..\n   username:${username} Connected`)
      req.session.user = {
          username: user.username,
          email: user.email,
          country: user.country,
          birthday: user.birthday,
          isAdmin: user.isAdmin
        };
      res.status(200).json({ user: req.session.user })
    }
    else{
      return res.status(401).send('Username or Password is Invalid');
    }

  } 
  catch (err) {
    res.status(500).send('A server error occurred. Please try again later.')
  }
})


 
app.get('/logout', (req, res) => {
  console.log(`-->Logout:\n   Trying..\n   username:${req.session.user.username} Disconnected`)
  req.session.destroy(err => {
    if (err) {
      return res.send('Error logging out')
    }
    res.clearCookie('connect.sid');
    res.send('Logged out');
  })
})


app.post('/registertion', (req, res) => {
  try {
    const { username, password, email, birthday, country } = req.body;
    const user = users.find(u => u.username === username)
    if(!user){
      // Add user to dummy database
      users.push({
        username,
        password,
        email,
        birthday,
        country,
        isActive: true,
        isAdmin: false
      })
      console.log(`-->Registerion:\n   Registration successful - add ${username}`)
      res.status(200).send('Registration successful.');
    }
    else{
      res.status(400).send("User is allready exist")
    }
  } catch (error) {
    res.status(500).send('An error occurred during registration.');
  }
});