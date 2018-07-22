const express = require("express");
const router = express.Router();

// --- DB Models --- //
const conversation = require("../models/Conversation");
const message = require("../models/Message");

// @route  GET api/conversation/test
// @desc   Test conversations route
// @access Public
router.get("/test", (req, res) => res.json({ Message: "Conversation Works" }));

// @route  POST api/conversation
// @desc   Send conversation message
// @access Public
router.post("/", (req, res) => {
  const { messageText } = req.body;
  res.json({ message: messageText });
});

module.exports = router;
