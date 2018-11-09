"use strict";
const tplinkCtrl = require("../controllers/tplink-controller");

const express = require('express');
const router = express.Router();

// Get all Initiated plugs
router.route("/").get(tplinkCtrl.getPlugs);

// Turn all Plugs On
router.route("/turnon").get(tplinkCtrl.turnAllPlugsOn);

// Turn all Plugs Off
router.route("/turnoff").get(tplinkCtrl.turnAllPlugsOff);

// Toggle all Plugs Off
router.route("/toggle").get(tplinkCtrl.toggleAllPlugs);


module.exports = router;
