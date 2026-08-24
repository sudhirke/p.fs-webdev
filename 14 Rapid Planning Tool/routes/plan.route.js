const express = require("express");
const router = express.Router();
const Plan = require("../models/plan.model"); //Import Model

//DEFINE ROUTES THAT MAPS TO

//Path /api/plan

router.get("/", async (req, res) => {
  try {
    const plans = await Plan.find({});
    res.status(200).json(plans);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    //Create new plan in database
    const plan = await Plan.create(req.body);
    res
      .status(200)
      .json({ message: `Success!! Created new plan ${plan.title}` });
  } catch (error) {
    //Send error
    res.status(503).json({ message: error.message });
  }
});

//Get Plans by id and title
router.get("/:id", async (req, res) => {
  try {
    //Find specific plan based on ID
    const plans = await Plan.find({ _id: req.params.id });
    res.status(200).json(plans);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.get("/title/:title", async (req, res) => {
  try {
    //Find specific plan based on title { "title": { $regex: /john/i } }

    const plans = await Plan.find({
      title: { $regex: `/${req.params.title}/i` },
    });
    res.status(200).json(plans);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Update plans APIS
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params; //extract the parameter

    //Find specific plan based on ID and update
    const plans = await Plan.findByIdAndUpdate(id, req.body);

    if (!plans) {
      return res
        .status(404)
        .json({ message: "No plan found with this details." });
    }

    //get updated detials
    const updatedPlan = await Plan.findById(id);

    res.status(200).json(updatedPlan);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Delete plans APIS
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params; //extract the parameter

    //Find specific plan based on ID and update
    const plans = await Plan.findByIdAndDelete(id);

    if (!plans) {
      return res.status(404).json({ message: "No plan found with this id." });
    }

    res
      .status(200)
      .json({ message: `Plan ${plans.title} deleted from database.` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//export the router
module.exports = router;
