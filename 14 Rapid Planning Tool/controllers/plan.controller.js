const Plan = require("../models/plan.model"); //import Plan model

//Get all plans from database
const getAllPlans = async (req, res) => {
  try {
    const plans = await Plan.find({});
    res.status(200).json(plans);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Create a new plan
const createNewPlan = async (req, res) => {
  try {
    if (!req.body) throw new Error("VALIDATIO FAILED - form data is empty");

    //Create new plan in database
    const plan = await Plan.create(req.body);
    res
      .status(200)
      .json({ message: `Success!! Created new plan ${plan.title}` });
  } catch (error) {
    //Send error
    res.status(503).json({ message: error.message });
  }
};

//Look for a plan by ID and Title
const getPlanById = async (req, res) => {
  try {
    //Find specific plan based on ID
    const plans = await Plan.find({ _id: req.params.id });
    res.status(200).json(plans);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getPlanByTitle = async (req, res) => {
  try {
    //Find specific plan based on title { "title": { $regex: /john/i } }

    const plans = await Plan.find({
      title: req.params.title,
    });
    res.status(200).json(plans);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//update plan by Id
const updatePlanById = async (req, res) => {
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
};

//delelete plan by Id
const deletePlanById = async (req, res) => {
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
};

//Export controller method for Plan Model
module.exports = {
  getAllPlans,
  createNewPlan,
  getPlanById,
  getPlanByTitle,
  updatePlanById,
  deletePlanById,
};
