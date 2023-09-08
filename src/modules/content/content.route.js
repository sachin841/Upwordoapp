const express = require('express')


const router = express.Router()

router.post("/api/appcontent", addappcontent)
router.get("/api/appcontent", allappcontent)
router.patch("/api/")