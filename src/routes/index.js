"use strict"

const router = require("express").Router()
/* ------------------------------------------------------- */

// auth:
router.use("/auth", require("./auth"))
// user:
router.use("/users", require("./user"))
//token:
router.use("/token", require("./token"))


//category:
router.use("/category", require("./category"))



/* ------------------------------------------------------- */
module.exports = router