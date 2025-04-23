const db = require('../db');

const getUsers = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT id, firstName, lastName, companyName, role, country FROM users');
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Database error" });
  }
};

const createUser = async (req, res) => {
    const { firstName, lastName, companyName, role, country } = req.body;
  
    if (!firstName || !lastName) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
  
    try {
      const query = `
        INSERT INTO users (firstName, lastName, companyName, role, country)
        VALUES (?, ?, ?, ?, ?)
      `;
      const [result] = await db.query(query, [firstName, lastName, companyName, role, country]);
      res.status(201).json({ message: 'User created successfully', userId: result.insertId });
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ error: 'Database insert error' });
    }
};

const deleteUser = async (req, res) => {
  const { id } = req.params; // Get the user ID from URL params

  if (!id) {
    return res.status(400).json({ message: 'Missing user ID' });
  }

  try {
    const query = 'DELETE FROM users WHERE id = ?';
    const [result] = await db.query(query, [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: `User with ID ${id} deleted successfully` });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Failed to delete user' });
  }
};

module.exports = { getUsers, createUser,deleteUser };