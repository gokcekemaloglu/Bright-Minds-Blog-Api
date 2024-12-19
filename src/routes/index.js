"use strict"

const router = require("express").Router()
/* ------------------------------------------------------- */

// auth:
router.use("/auth", require("./auth"))
// user:
router.use("/users", require("./user"))
//token:
router.use("/token", require("./token"))


//blog:
router.use("/blog", require("./blog"))
//category:
router.use("/category", require("./category"))
//comment:
// router.use("/comment", require("./comment"))



/* ------------------------------------------------------- */
module.exports = router