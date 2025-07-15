import express from "express";
import cors from "cors";

const PORT = 3001;

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send({
    RouteName: "home route",
    message: "set up the logic for home route here...",
  });
});

app.post("/users", (req, res) => {
  const user = req.body;
  res.send(user);
});

app.post("/driverRequest", (req, res) => {
  const driverRequest = req.body;
  res.send(driverRequest);
});

app.get("/availableMech", (req, res) => {
  res.send({ availableMechanic: "fetched from database" });
});

app.post("/mechanicReg", (req, res) => {
  const mechRegData = req.body;
  res.send(mechRegData);
});

app.get("/availableTasks", (req, res) => {
  res.send({ availableTasks: "details fetched from database" });
});

app.get("/completedTask", (req, res) => {
  res.send({ data: "Details fetched from Database" });
});

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
