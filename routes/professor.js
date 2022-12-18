
var express = require("express");
const { route } = require("./auth");
const { expandProfessor, getAllProfessors, addProfessor, editRating, allInstitutes } = require("../controllers/professorController");
const { isSignedIn } = require("../controllers/authController");
var router = express.Router();




// Different Route functions
router.get('/professor/:professorId',expandProfessor);
router.get('/allProfs/:instituteName/:departmentName',getAllProfessors);
router.get('/allInstitute', allInstitutes)
router.put('/addProfessor',isSignedIn, addProfessor);
router.put('/giveRating/:professorId',isSignedIn,editRating );


module.exports = router;