"use strict";
const hueCtrl = require('../controllers/hue-controller');

const express = require('express');
const router = express.Router();


router.route("/").get(hueCtrl.getConfig);

// Get all states from Hue
router.route("/state").get(hueCtrl.getFullState);

// Get Lights States
router.route("/lights").get(hueCtrl.getLightsState);

// Get Single Light State
router.route("/lights/:id")
    .get(hueCtrl.getLightState)
    .post(hueCtrl.changeLightState) // should not be here... PUT Should be used :D
    .put(hueCtrl.changeLightState);

// Get Single Light State with RGB
router.route("/lights/:id/full").get(hueCtrl.getLightStateFull);

// Get request for turning light on
router.route("/lights/:id/turnon").get(hueCtrl.turnLightOn);
// Get request for turning light off
router.route("/lights/:id/turnoff").get(hueCtrl.turnLightOff);

// GROUPS

// Get Groups State
router.route("/groups").get(hueCtrl.getGroupsState);

// Get Single Group State
router.route("/groups/:id")
    .get(hueCtrl.getGroupState)
    .post(hueCtrl.changeGroupState) // should not be here... PUT Should be used :D
    .put(hueCtrl.changeGroupState);

// Get request for turning group on
router.route("/groups/:id/turnon").get(hueCtrl.turnGroupOn);
// Get request for turning group off
router.route("/groups/:id/turnoff").get(hueCtrl.turnGroupOff);


module.exports = router;
