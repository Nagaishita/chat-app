const express = require("express");
const router = express.Router();
const db = require("../config/db"); // if not already imported

const { saveMessage } = require("../controllers/chatController");

router.post("/message", saveMessage);

// ✅ Add this new GET route to fetch all messages
router.get("/messages", (req, res) => {
  db.query(
    "SELECT m.id, u.name AS sender, m.message, m.created_at FROM messages m JOIN users u ON m.user_id = u.id ORDER BY m.created_at ASC",
    (err, results) => {
      if (err) return res.status(500).json({ message: "DB error", error: err });

      res.status(200).json(results);
    }
  );
});

module.exports = router;
