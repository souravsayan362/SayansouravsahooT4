import Task from '../models/Task.js';

const handleDBError = (res, error) => {
  if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message });
  }
  res.status(500).json({ error: 'Database operation failed' });
};

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.status(200).json(tasks);
  } catch (error) {
    handleDBError(res, error);
  }
};

export const createTask = async (req, res) => {
  try {
    const task = new Task({ text: req.body.text });
    const saved = await task.save();
    res.status(201).json(saved);
  } catch (error) {
    handleDBError(res, error);
  }
};

export const updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      {
        text: req.body.text,
        completed: req.body.completed,
        lastModified: Date.now()
      },
      { new: true, runValidators: true }
    );

    if (!task)
      return res.status(404).json({ error: 'Task not found' });

    res.status(200).json(task);
  } catch (error) {
    handleDBError(res, error);
  }
};

export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task)
      return res.status(404).json({ error: 'Task not found' });

    res.status(204).end();
  } catch (error) {
    handleDBError(res, error);
  }
};
