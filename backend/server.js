const express = require('express');
require('dotenv').config();
const app = express();
const userRoutes = require('./routes/users');
const cors = require('cors');

app.use(cors());
app.use(express.json());

app.use('/users', userRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'User API is running' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});