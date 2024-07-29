const express = require("express")
const router = express.Router()
const {addAIgen,getAIgen} = require("../controllers/user.controller")

router.post("/", addAIgen)
router.get("/", getAIgen)


module.exports = router 