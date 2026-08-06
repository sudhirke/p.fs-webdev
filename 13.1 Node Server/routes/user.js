const express = require("express"); //express module is used to create a web server and handle HTTP requests and responses
const {
  handleGetAllUsers,
  handleGetUserById,
  handleUpdateUserById,
  handleDeleteUserById,
  handleCreateUser,
} = require("../controllers/user"); //require to load handleGetAllUsers module

const userRouter = express.Router(); //router is used to define routes for the users API endpoints

// Users as a JSON response when the /api/users endpoint is accessed. -->
userRouter.route("/").get(handleGetAllUsers).post(handleCreateUser);

//Combine different requests for the same endpoint using app.route() method and handler functions from controllers/user.js file. -->
userRouter
  .route("/:id")
  .get(handleGetUserById)
  .patch(handleUpdateUserById)
  .delete(handleDeleteUserById);

module.exports = { userRouter };
