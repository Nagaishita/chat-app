const db = require("../config/db");

const saveMessage = (req, res) => {
  const { userId, message } = req.body;

  if (!userId || !message) {
    return res.status(400).json({ message: "userId and message are required" });
  }

  db.query(
    "INSERT INTO messages (user_id, message) VALUES (?, ?)",
    [userId, message],
    (err, result) => {
      if (err) return res.status(500).json({ message: "DB error", error: err });

      res.status(201).json({ message: "Message saved successfully", messageId: result.insertId });
    }
  );
};

module.exports = {
  saveMessage
};
