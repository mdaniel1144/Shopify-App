const express = require('express');
const session = require('express-session');
const cors = require('cors');
const path = require('path');
const bcrypt = require('bcryptjs'); 
const app = express();
const PORT = process.env.PORT || 5000;
const { connectDB } = require('./config/mongoDB');
const User = require('./models/User');
const Product = require('./models/Product');
const Sales = require('./models/Sales');
const Criticism = require('./models/Criticism');


console.log(PORT)

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
    const { ids, category, brand } = req.query;

    let query = {};

    if (ids) {
      const idsArray = ids.split(',').map(id => id.trim());
      query._id = { $in: idsArray };
    }

    if (category) {
      query.category = category.toLowerCase();
    }

    if (brand) {
      query.brand = brand.toLowerCase(); 
    }
    const products = await Product.find(query);
    res.status(200).json(products);
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
    const {serial, name, price,count, brand, date, description, category , image} = req.body;

    // Validate that all required fields are provided
    if (!serial || !name || !price || !count || !brand || !date || !description || category === 'none') {
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
      count,
      description,
      category,
      image
    });

    // Save the new product to the database
    await newProduct.save();
    console.log(`-->Products:\n   Insert successful - add ${name}`)
    res.status(201).send("Insert new Product");
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


app.post('/users/update', async (req, res) => {
  try {
    const {id , username, password, birthday, email,category , isActive , isAdmin} = req.body;

    // Validate that all required fields are provided
    if (!id) {
      return res.status(400).json({ message: 'username is required' });
    }
    // Find the user by ID
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the new username is already taken (excluding the current user)
    if (username && username !== user.username) {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
          return res.status(400).json({ message: 'Username is already taken' });
        }
    }

    const updateFields = { username, birthday, email, category, isActive, isAdmin };
    if (password) {
      updateFields.password = await bcrypt.hash(password, 10);       // Hash the new password if provided
    }

    // Find and update the product
    const updatedUser = await User.findByIdAndUpdate(
      id,                 // Query to find the product by serial
      updateFields,       // Fields to update
      { new: true }       // Return the updated document
    )

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(updatedUser);

  } catch (err) {
    console.error('-->Users:\n   Error updating User:', err);
    res.status(500).send('An error occurred while updating the Users.');
  }
})
app.post('/users/update_password', async (req, res) => {
  try {
    const { id, oldPassword, newPassword } = req.body;

    // Validate required fields
    if (!id || !oldPassword || !newPassword) {
      return res.status(400).json({ message: 'ID, old password, and new password are required' });
    }

    // Find the user by ID
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Verify the old password
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Old password is incorrect' });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: 'Password updated successfully' });

  } catch (err) {
    console.error('-->Users:\n   Error updating password:', err);
    res.status(500).send('An error occurred while updating the password.');
  }
})
app.post('/users/insert', async (req, res) => {
  try {
    const {username, password, birthday, email,country , isActive = true , isAdmin = false} = req.body;

    // Validate that all required fields are provided
    if (!username || !password || !birthday || !email || country === 'none') {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if a user with the same username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'User is already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      username,
      password: hashedPassword,
      email,
      birthday,
      country,
      isAdmin,
      isActive,
    });

    // Save the new user to the database
    await newUser.save();
    console.log(`-->Users:\n   insert successful - add ${username}`)
    res.status(201).send("Insert new user");
  } catch (err) {
    console.error('-->Users:\n   Error inserting User:', err);
    res.status(500).send('An error occurred while inserting the User.');
  }
});
app.delete('/users/delete/:_id', async (req, res) => {
  try {
    // Extract serial from URL parameters
    const { _id } = req.params;

    // Validate that the id is provided
    if (!_id) {
      return res.status(400).json({ message: 'user id is required' });
    }

    // Find and delete the User by serial
    const deletedUser = await User.findOneAndDelete({_id });

    // Check if the User was found and deleted
    if (!deletedProduct) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully', deletedProduct });
  } catch (err) {
    console.error('-->Users:\n   Error deleting User:', err);
    res.status(500).send('An error occurred while deleting the User.');
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

//--------------------- Sales ------------------------
app.get('/sales', async (req, res) => {
  try {
    const { userID } = req.query;

    if (!userID) {
      return res.status(400).send('userID query parameter is required.');
    }

    const sales = await Sales.find({ userID });

    res.status(200).json(sales);
  } catch (err) {
    console.error('-->Sales:\n   Error fetching sales by userID:', err);
    res.status(500).send('An error occurred while fetching sales.');
  }
});


app.post('/session' , async (req, res) => {
  if (req.session.user) {
    console.log(`-->Login:\n   Exist Session: ${username}`)
    req.session.user = { id: user.id ,username: user.username , email : 'daniel@n-k.org.il' , country : 'usa' , birthday: Date.now() , 'isAdmin' : true};
    res.status(200).json({ user: req.session.user })
  } else {
    res.status(401).send('Please login first');
  }
});


app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body

    // Find user by username
    const user = await User.findOne({ username }).exec()
    if (!user) {
      return res.status(401).send('Username or Password is Invalid')
    }

    // Compare provided password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password)

    if (isMatch && user.isActive) {
      console.log(`-->Login:\n   Trying..\n   username:${username} Connected`)
      
      // Store user session data
      req.session.user = {
        id: user._id,
        username: user.username,
        email: user.email,
        country: user.country,
        birthday: user.birthday,
        isAdmin: user.isAdmin
      }

      res.status(200).json({ user: req.session.user })
    } else {
      return res.status(401).send('Username or Password is Invalid')
    }

  } catch (err) {
    console.error('Error during login:', err)
    res.status(500).send('A server error occurred. Please try again later.');
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


app.post('/payment', async (req, res) => {

  const { userId, cart , isracard } = req.body;

  try {
    if(isracard)
      console.log('-->Conncted to Isracard Service API..')
    else
      throw new Error('Isracard is not accepted')
    // Loop through each item in the cart
    for (let item of cart.items) {
      const result = await Product.updateOne(
        { _id: item.product._id, count: { $gte: item.count } }, // Ensure enough stock exists
        { $inc: { count: -item.count } }                        // Decrement the count
      );

      // Check if the update was successful
      if (result.matchedCount === 0) {
        throw new Error(`Not enough stock for product ID ${item.product._id} or product not found`);
      }
    }


    // Create a new Sale document
    const newSale = new Sales({
      userID: userId,
      products: cart.items.map(item => ({
        itemID: item.product._id,
        count: item.count,
      })),
      totalItems: cart.totalItems,
      totalPrice: cart.totalPrice,
      dateStart: new Date(), // Current date and time
      dateEnd: new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000), // 30 days after dateStart    
      status: 'Progress', // Mark as in progress, change to "Paid" when payment is confirmed
    });

    await newSale.save();
    console.log(`-->UserID: ${userId} \nPayment successful and sale recorded`);
    res.status(200).json({ message: 'Payment successful and sale recorded' });
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error.message });
  }
});



//----------------------------------------------------
app.get('/criticism', async (req, res) => {
  try {
    const { productID } = req.query;

    if (!productID) 
      return res.status(400).send('productID query parameter is required.')
    
    const criticisms = await Criticism.find({productID})
    const userIDs = criticisms.map(c => c.userID);
    const users = await User.find({ _id: { $in: userIDs } });

    const criticismsWithUsernames = criticisms.map(crit => ({
      ...crit.toObject(),
      username: users.find(u => u._id.equals(crit.userID)).username
    }));

    console.log(`-->Criticism:\n   Get ${criticisms.length} of the criticism of productID: ${productID}`)
    res.status(200).json(criticismsWithUsernames)
  } catch (err) {
    console.error('-->Criticism:\n   Error fetching criticisms:', err);
    res.status(500).send('An error occurred while fetching criticisms.');
  }
});

app.post('/criticism/insert', async (req, res) => {
  try {
    const { productID, content, userID } = req.body;

    if (!productID) {
      return res.status(400).send('productID is required.');
    }

    // Create a new Criticism document
    const newCriticism = new Criticism({
      productID,
      userID,
      dateCreated: new Date(),
      content,
    });

    await newCriticism.save();
    console.log(`-->Criticism: ${userID} \nCriticism insert successful`);
    res.status(200).json({ message: 'Criticism insert successful' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

