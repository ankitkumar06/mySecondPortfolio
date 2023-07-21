const express = require('express');
const router = express.Router();
const contactModule = require("../module/systemContactDataModule")

router.post("/createContact", contactModule.createContact);

module.exports = router;