const express = require('express');
const bodyParser = require('body-parser');
const port = 3000;
const app = express();

let data = [];

app.use(bodyParser.json());

app.get('/todos', getTodos);

function getTodos(req, res) {
  res.status(200).json(data);
}

app.get('/todos/:id', (req, res) => {
  const id = req.params.id - 1;
  if (id >= 0 && id < data.length) {
    res.status(200).json(data[id]);
  } else {
    res.status(404).json('Todo item not found');
  }
});

app.post('/todos', (req, res) => {
  const todoItem = {
    id: data.length + 1,
    title: req.body.title,
    completed: req.body.completed,
    description: req.body.description,
  };
  data.push(todoItem);
  res.status(201).json({ id: todoItem.id });
});

app.put('/todos/:id', (req, res) => {
  const id = req.params.id - 1;
  if (id >= 0 && id < data.length) {
    const todoItem = {
      id: id + 1,
      title: req.body.title,
      completed: req.body.completed,
      description: req.body.description,
    };
    data[id] = todoItem;
    res.status(200).json({ id: todoItem.id });
  } else {
    res.status(404).json('Todo item not found');
  }
});

app.delete('/todos/:id', (req, res) => {
  const id = req.params.id - 1;
  if (id >= 0 && id < data.length) {
    data.splice(id, 1);
    res.status(200).json('Todo item deleted successfully!');
  } else {
    res.status(404).json('Todo item not found');
  }
});

// app.listen(port, () => {
//   console.log(`Server is listening on port ${port}`);
// });

module.exports = app;
