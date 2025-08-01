const db = require("../config/db");
const bcrypt = require("bcryptjs");

const registerUser = async (req, res) => {
  const { name, email, phone, password } = req.body;

  if (!name || !email || !phone || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Check if user exists
  db.query("SELECT * FROM users WHERE email = ?", [email], async (err, results) => {
    if (err) return res.status(500).json({ message: "DB error", error: err });

    if (results.length > 0) {
      return res.status(409).json({ message: "User already exists" });
    }

    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      db.query(
        "INSERT INTO users (name, email, phone, password) VALUES (?, ?, ?, ?)",
        [name, email, phone, hashedPassword],
        (err, result) => {
          if (err) return res.status(500).json({ message: "Insert error", error: err });

          res.status(201).json({ message: "User registered successfully", userId: result.insertId });
        }
      );
    } catch (err) {
      res.status(500).json({ message: "Encryption error", error: err });
    }
  });
};

module.exports = { registerUser };
