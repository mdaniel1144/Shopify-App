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


app.get('/HelloWorld', (req, res) => {
  res.send('Hello from the backend!');
});

// Create a route to get all users
app.get('/products', async (req, res) => {
  try {
      const question = req.query.question
      const answer = req.query.answer

      let query = {};
      let products;

      if (question && answer) {
        query[question] = answer.toLowerCase();
        products = await Product.find(query);
      }
      else {
        products = await Product.find()
      }
      res.status(200).json(products)
    }
    catch (err) {
      console.error('-->Products:\n   Error fetching products:', err)
     res.status(500).send('An error occurred while fetching products.')
    }
})
app.post('/products/update', async (req, res) => {
  try {
    const {serial, name, price, brand, date, description, category , image} = req.body;

    // Validate that all required fields are provided
    if (!serial) {
      return res.status(400).json({ message: 'Serial number is required' });
    }

    // Find and update the product
    const updatedProduct = await Product.findOneAndUpdate(
      { serial: serial },                                                   // Query to find the product by serial
      { serial, name, price, brand, date, description, category , image },  // Fields to update
      { new: true }                                                 // Return the updated document
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(updatedProduct);

  } catch (err) {
    console.error('-->Products:\n   Error updating product:', err);
    res.status(500).send('An error occurred while updating the product.');
  }
});
app.post('/products/insert', async (req, res) => {
  try {
    const {serial, name, price, brand, date, description, category , image} = req.body;

    // Validate that all required fields are provided
    if (!serial || !name || !price || !brand || !date || !description || category === 'none') {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if a product with the same serial already exists
    const existingProduct = await Product.findOne({ serial });
    if (existingProduct) {
      return res.status(400).json({ message: 'Product with this serial number already exists' });
    }

    // Create a new product
    const newProduct = new Product({
      serial,
      name,
      price,
      brand,
      date,
      description,
      category,
      image
    });

    // Save the new product to the database
    await newProduct.save();

    res.status(201).json(newProduct);
  } catch (err) {
    console.error('-->Products:\n   Error inserting product:', err);
    res.status(500).send('An error occurred while inserting the product.');
  }
});
app.delete('/products/delete/:_id', async (req, res) => {
  try {
    // Extract serial from URL parameters
    const { _id } = req.params;

    // Validate that the serial is provided
    if (!_id) {
      return res.status(400).json({ message: 'Serial number is required' });
    }

    // Find and delete the product by serial
    const deletedProduct = await Product.findOneAndDelete({_id });

    // Check if the product was found and deleted
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'Product deleted successfully', deletedProduct });
  } catch (err) {
    console.error('-->Products:\n   Error deleting product:', err);
    res.status(500).send('An error occurred while deleting the product.');
  }
});


app.get('/users', async (req, res) => {
  try {
      const question = req.query.question
      const answer = req.query.answer

      let query = {};
      let users;

      if (question && answer) {
        query[question] = answer.toLowerCase();
        users = await User.find(query);
      } 
      else {
        users = await User.find()
      }
    res.status(200).json(users)
  }
  catch (err) {
    console.error('-->Users:\n   Error fetching users:', err)
    res.status(500).send('An error occurred while fetching users.')
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