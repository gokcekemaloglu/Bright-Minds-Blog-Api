"use strict"

const router = require("express").Router()
/* ------------------------------------------------------- */

// user:
router.use("/users", require("./user"))
//token:
router.use("/token", require("./token"))



/* ------------------------------------------------------- */
module.exports = router