// DEPENDENCIES
require("dotenv").config();
const { PORT = 4000, MONGODB_URL } = process.env;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const methodOverride = require("method-override");
const routes = require("./routes/index");

// DATABASE CONNECTION
mongoose.connect(MONGODB_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

// Connection Events
mongoose.connection
  .on("open", () => console.log("You are connected to mongoose"))
  .on("close", () => console.log("You are disconnected from mongoose"))
  .on("error", (error) => console.log(error));

// MiddleWare
app.use(cors()); // to prevent cors errors, open access to all origins
app.use(express.json()); // parse json bodies
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extend: true }));
app.use(express.static("public"));

// Routes / Controllers

/* Test Route */
app.get("/", (req, res) => {
  const template = `
          <div style="height: 100vh; display: flex; justify-content: center; align-items: center;">
            <h1> HELLO WORLD</h1>
          </div>
        `;
  res.send(template);
});

app.use("/caregiver", routes.caregiverRoutes);
app.use("/child", routes.childRoutes);
app.use("/rewards", routes.rewardsRoutes);
app.use("/tasks", routes.tasksRoutes);

// LISTENER
app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));