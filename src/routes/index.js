"use strict"

const router = require("express").Router()
/* ------------------------------------------------------- */

// user:
router.use("/users", require("./user"))
//token:



/* ------------------------------------------------------- */
module.exports = router