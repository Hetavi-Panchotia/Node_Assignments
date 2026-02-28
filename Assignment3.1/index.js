const express = require("express");

const app = express();


const states = [
  { id: 1, name: "Andhra Pradesh", population: 49386799, literacyRate: 67.02, annualBudget: 279279, gdp: 14000000 },
  { id: 2, name: "Arunachal Pradesh", population: 1383727, literacyRate: 65.38, annualBudget: 28000, gdp: 300000 },
  { id: 3, name: "Assam", population: 31205576, literacyRate: 72.19, annualBudget: 122000, gdp: 4500000 },
  { id: 4, name: "Bihar", population: 104099452, literacyRate: 61.80, annualBudget: 261885, gdp: 6500000 },
  { id: 5, name: "Chhattisgarh", population: 25545198, literacyRate: 70.28, annualBudget: 121500, gdp: 4000000 },
  { id: 6, name: "Goa", population: 1458545, literacyRate: 88.70, annualBudget: 25000, gdp: 800000 },
  { id: 7, name: "Gujarat", population: 63872399, literacyRate: 78.03, annualBudget: 243965, gdp: 21000000 },
  { id: 8, name: "Haryana", population: 25351462, literacyRate: 75.55, annualBudget: 180000, gdp: 9000000 },
  { id: 9, name: "Himachal Pradesh", population: 6864602, literacyRate: 82.80, annualBudget: 50000, gdp: 2000000 },
  { id: 10, name: "Jharkhand", population: 32988134, literacyRate: 66.41, annualBudget: 110000, gdp: 4500000 }
]


app.get("/states", (req, res) => {
    res.status(200).json(states)
});


app.get("/states/:id", (req, res) => {
  const userId = Number(req.params.id);
  const state = states.find(u => u.id == userId);

  if (!state) {
    return res.status(404).json({ message: "User not found" });
  }

  res.status(200).json(state);
});


app.get("/states/highest-gdp", (req, res) => {

  var max = -1
  for(i of states){
    if(i.gdp > max){
      max = i.gdp
       var index = states.indexOf(i)
    }
  }

  if (index == -1) {
    return res.status(404).json({ message: "User not found" });
  }

  res.status(200).json(states[index]);
});


app.use(express.json());

app.post("/states", (req, res) => {
  const newState = {
    id: states.length + 1,
    name: req.body.name,
    population: req.body.population,
    literacyRate: req.body.literacyRate,
    annualBudget: req.body.annualBudget,
    gdp: req.body.gdp
  };

  states.push(newState);

  res.status(201).json({
    message: "State created",
    state: newState
  });

});


app.put("/states/:id", (req, res) => {
  const stateId = Number(req.params.id);
  const index = states.findIndex(u => u.id == stateId);

  if (index === -1) {
    return res.status(404).json({ message: "User not found" });
  }

  states[index] = {
    id: stateId,
    name: req.body.name,
    population: req.body.population,
    literacyRate: req.body.literacyRate,
    annualBudget: req.body.annualBudget,    
    gdp: req.body.gdp 
  };

  res.status(200).json({
    message: "State replaced",
    states: states[index]
  });
});


app.put("/states/:id/budget", (req, res) => {
  const stateId = Number(req.params.id);
  const budget = req.body.annualBudget;

  const data = states.find(u => u.id == stateId);

  if (!data) {
    return res.status(404).json({ message: "User not found" });
  }

  data.annualBudget = budget;

  res.status(200).json({
    message: "Budget updated",
    states: data
  });
});


app.put("/states/:id/population", (req, res) => {
  const stateId = Number(req.params.id);
  const population = req.body.population;

  const data = states.find(u => u.id == stateId);

  if (!data) {
    return res.status(404).json({ message: "User not found" });
  }

  data.population = population;

  res.status(200).json({
    message: "Budget updated",
    states: data
  });
});


app.patch("/states/:id/literacy", (req, res) => {
  const stateId = Number(req.params.id);
  const state = states.find(u => u.id == stateId);

  if (!state) {
    return res.status(404).json({ message: "state not found" });
  }

  if (req.body.literacyRate) state.literacyRate = req.body.literacyRate;

  res.status(200).json({
    message: "state updated",
    state
  });
});


app.patch("/states/:id/gdp", (req, res) => {
  const stateId = Number(req.params.id);
  const state = states.find(u => u.id == stateId);

  if (!state) {
    return res.status(404).json({ message: "state not found" });
  }

  if (req.body.gdp) state.gdp = req.body.gdp;

  res.status(200).json({
    message: "state updated",
    state
  });
});


app.patch("/states/:id", (req, res) => {
  const stateId = Number(req.params.id);
  const state = states.find(u => u.id == stateId);

  if (!state) {
    return res.status(404).json({ message: "state not found" });
  }

  if (req.body.name) state.name = req.body.name;
  if (req.body.population) state.population = req.body.population;
  if (req.body.literacyRate) state.literacyRate = req.body.literacyRate;  
  if (req.body.annualBudget) state.annualBudget = req.body.annualBudget;
  if (req.body.gdp) state.gdp = req.body.gdp;

  res.status(200).json({
    message: "state updated",
    state
  });
});


app.delete("/states/:id", (req, res) => {
  const stateId = Number(req.params.id);
  const index = states.findIndex(u => u.id === stateId);

  if (index === -1) {
    return res.status(404).json({ message: "User not found" });
  }

  states.splice(index, 1);

  res.status(204).json({
    message: "state deleted"
  })
});


app.delete("/states/name/:stateName", (req, res) => {
  const staname = req.params.stateName.toLowerCase()
  const index = states.findIndex(u => u.name.toLowerCase() == staname);

  if (index === -1) {
    return res.status(404).json({ message: "User not found" });
  }

  states.splice(index, 1);

  res.status(204).json({
    message: "state deleted"
  })
});


app.delete("/states/low-literacy/:percentage", (req, res) => {

  var c = 0

  for(i of states){
    if(i.literacyRate < req.params.percentage){
      c++
      states.splice(states.indexOf(i), 1)
    }
  }

  res.status(204).json({
    "deletedCount" : c
  });

});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
