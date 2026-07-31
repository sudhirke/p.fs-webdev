const express = require("express");
const fs = require("fs");
const users = require("./users.json");
const app = express();

app.use(express.urlencoded({ extended: false }));
const PORT = 8000;

// For browsers return formatted HTML when the /users endpoint is accessed. -->
app.get("/users", (req, res) => {
  const userList = users
    .map(
      (user) => `<li>${user.first_name} ${user.last_name} - ${user.email}</li>`,
    )
    .join("");
  const html = `
      <html>
        <head>
          <title>Users</title>
        </head>
        <body>
          <h1>Users</h1>
          <ul>${userList}</ul>
        </body>
      </html>
    `;
  res.send(html);
});

// This is a simple Express server that listens on port 8000 and responds with "Hello, World!" when the root URL is accessed. -->
// Users as a JSON response when the /api/users endpoint is accessed. -->
app.get("/api/users", (req, res) => {
  return res.json(users);
});

//PUT Request to create a new user
app.put("/api/users", express.json(), (req, res) => {
  const { first_name, last_name, email } = req.body;
  if (!first_name || !last_name || !email) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  const newUser = {
    id: users.length + 1,
    first_name,
    last_name,
    email,
  };
  users.push(newUser);
  return res.status(201).json(newUser);
});

//Combine different requests for the same endpoint using app.route() method
app
  .route("/api/users/:id")
  .get((req, res) => {
    const user = users.find((u) => u.id === parseInt(req.params.id));
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.json(user);
  })
  .patch(express.json(), (req, res) => {
    const userIndex = users.findIndex((u) => u.id === parseInt(req.params.id));
    if (userIndex === -1) {
      return res.status(404).json({ error: "User not found" });
    }
    const { first_name, last_name, email, gender, job_title } = req.body;
    if (!first_name || !last_name || !email) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    users[userIndex] = {
      id: parseInt(req.params.id),
      first_name,
      last_name,
      email,
      gender,
      job_title,
    };

    //write the data into file users.json using fs.writeFile() method. The JSON.stringify() method is used to convert the users array into a JSON string, and the null and 2 arguments are used to format the JSON string with indentation for better readability.
    fs.writeFile(
      "./users.json",
      JSON.stringify(users, null, 2),
      (err, data) => {
        if (err) {
          console.error(err);
          return res.status(500).json({
            error:
              "Failed to save details about " + `${first_name} ${last_name}`,
          });
        } else {
          console.log(`User ${first_name} ${last_name} updated successfully`);
        }
      },
    );
    return res.json(users[userIndex]);
  })
  .delete((req, res) => {
    const userIndex = users.findIndex((u) => u.id === parseInt(req.params.id));
    if (userIndex === -1) {
      return res.status(404).json({ error: "User not found" });
    }
    const deletedUser = users.splice(userIndex, 1);

    //update details in json file
    fs.writeFile(
      "./users.json",
      JSON.stringify(users, null, 2),
      (err, data) => {
        if (err) {
          console.error(err);
          return res.status(500).json({
            error:
              "Failed to delete details about " +
              `${deletedUser[0].first_name} ${deletedUser[0].last_name}`,
          });
        } else {
          console.log(
            `User ${deletedUser[0].first_name} ${deletedUser[0].last_name} deleted successfully`,
          );
        }
      },
    );
    return res.json(deletedUser[0]);
  });

// POST Route to create a new user
app.post("/api/users", express.json(), (req, res) => {
  const { first_name, last_name, email, gender, job_title } = req.body;
  if (!first_name || !last_name || !email) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  const newUser = {
    id: users.length + 1,
    first_name,
    last_name,
    email,
    gender,
    job_title,
  };
  //Add the new user to the users array and save it to the users.json file
  users.push(newUser);

  //write the data into file users.json using fs.writeFile() method. The JSON.stringify() method is used to convert the users array into a JSON string, and the null and 2 arguments are used to format the JSON string with indentation for better readability.
  fs.writeFile("./users.json", JSON.stringify(users, null, 2), (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Failed to save user" });
    } else {
      console.log(
        `User ${newUser.first_name} ${newUser.last_name} saved successfully`,
      );
    }
  });

  return res.status(201).json(newUser);
});

/* 
// Get specific users using dynamic parameters
app.get("/api/users/:id", (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  return res.json(user);
});

app.patch("/api/users/:id", express.json(), (req, res) => {
  const userIndex = users.findIndex((u) => u.id === parseInt(req.params.id));
  if (userIndex === -1) {
    return res.status(404).json({ error: "User not found" });
  }
  const { first_name, last_name, email } = req.body;
  if (!first_name || !last_name || !email) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  users[userIndex] = {
    id: parseInt(req.params.id),
    first_name,
    last_name,
    email,
  };
  return res.json(users[userIndex]);
});

app.delete("/api/users/:id", (req, res) => {
  const userIndex = users.findIndex((u) => u.id === parseInt(req.params.id));
  if (userIndex === -1) {
    return res.status(404).json({ error: "User not found" });
  }
  const deletedUser = users.splice(userIndex, 1);
  return res.json(deletedUser[0]);
}); 
*/

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
