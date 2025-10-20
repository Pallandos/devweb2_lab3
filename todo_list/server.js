const express = require('express');
const app = express();
app.use(express.json());

// Task model
let tasks = [
  { id: 1, description: 'Finish lab report', completed: false },
  { id: 2, description: 'Review lecture notes', completed: false }
];


// POST /tasks - Add a new task
app.post('/tasks', (req, res) => {
  const { description, completed } = req.body;
  if (typeof description !== 'string' || typeof completed !== 'boolean') {
    return res.status(400).json({ error: 'Invalid task format.' });
  }
  const id = tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1;
  const newTask = { id, description, completed };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// GET /tasks - Return all tasks
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// GET /tasks/pending - Return all pending tasks
app.get('/tasks/pending', (req, res) => {
  const pendingTasks = tasks.filter(task => !task.completed);
  res.json(pendingTasks);
});

// PUT /tasks/:id - Update a task by id
app.put('/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { description, completed } = req.body;
  const task = tasks.find(t => t.id === id);
  if (!task) {
    return res.status(404).json({ error: 'Task not found.' });
  }
  if (description !== undefined) task.description = description;
  if (completed !== undefined) task.completed = completed;
  res.json(task);
});

// DELETE /tasks - Remove all completed tasks
app.delete('/tasks', (req, res) => {
  const before = tasks.length;
  tasks = tasks.filter(task => !task.completed);
  const removed = before - tasks.length;
  res.json({ removed });
});

// DELETE /tasks/:id - Remove a task by id
app.delete('/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = tasks.findIndex(t => t.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Task not found.' });
  }
  const removedTask = tasks.splice(index, 1)[0];
  res.json(removedTask);
});

module.exports = { app, tasks };

// Start server if run directly
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}