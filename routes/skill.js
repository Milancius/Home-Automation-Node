"use strict";

const skillsCtrl = require("../controllers/skills-controller");
const express = require('express');
const router = express.Router();

router.route("/")
    .get((req, res) => {return res.status(200).json(global.SKILLS)})
    .post(skillsCtrl.addSkill);

router.route("/:skill_name").get(skillsCtrl.useSkill);

module.exports = router;
