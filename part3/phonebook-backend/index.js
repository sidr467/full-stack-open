const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());
app.use(express.static("dist"));

let persons = [
  { id: "1", name: "John Doe", number: "123-456-7890" },
  { id: "2", name: "Jane Smith", number: "234-567-8901" }
];

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.post("/api/persons", (req, res) => {
  const person = req.body;
  if (!person.name || !person.number) {
    return res.status(400).json({ error: "Name and number are required" });
  }
  person.id = Math.random().toString(36).substring(2, 15); // Simple ID generation
  persons = persons.concat(person);
  res.json(person);
});

app.delete("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  persons = persons.filter(person => person.id !== id);
  res.status(204).end();
});

app.put("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  const updatedPerson = req.body;
  persons = persons.map(person =>
    person.id === id ? { ...person, ...updatedPerson } : person
  );
  res.json(updatedPerson);
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
