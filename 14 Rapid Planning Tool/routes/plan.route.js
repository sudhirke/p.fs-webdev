const express = require("express");
const router = express.Router();
//const Plan = require("../models/plan.model"); //Import Model

//Import functions from Controller
const {
  getAllPlans,
  createNewPlan,
  getPlanById,
  getPlanByTitle,
  updatePlanById,
  deletePlanById,
} = require("../controllers/plan.controller");

//DEFINE ROUTES THAT MAPS TO
//Path /api/plan
router.get("/", getAllPlans);
router.post("/", createNewPlan);

//Get Plans by id and title
router.get("/:id", getPlanById);
router.get("/title/:title", getPlanByTitle);

//Update plans APIS
router.put("/:id", updatePlanById);

//Delete plans by Id
router.delete("/:id", deletePlanById);

//export the router
module.exports = router;
