const pool = require('../db');
const router = require('express').Router();

// get all todos
router.get('/', async (req, res) => {
  try {
    const allTodos = await pool.query('SELECT * FROM todo');
    res.status(200).json(allTodos.rows);
  } catch (error) {
    res.status(500).json(error);
  }
});

// get a todo
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const getTodo = await pool.query('SELECT * FROM todo WHERE todo_id = $1', [
      id,
    ]);
    res.status(200).json(getTodo.rows);
  } catch (error) {
    res.status(500).json(error);
  }
});

// create a todo
router.post('/', async (req, res) => {
  try {
    const { description } = req.body;
    const newTodo = await pool.query(
      'INSERT INTO todo (description) VALUES ($1) RETURNING *',
      [description]
    );
    res.status(200).json(newTodo.rows[0]);
  } catch (error) {
    res.status(500).json(error);
  }
});

// update a todo
router.put('/:id', async (req, res) => {
  try {
    const { description } = req.body;
    const { id } = req.params;
    const updateTodo = await pool.query(
      'UPDATE todo SET description = $1 WHERE todo_id = $2',
      [description, id]
    );
    res.status(200).json('Todo has been updated');
  } catch (error) {
    res.status(500).json(error);
  }
});

// delete a todo
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await pool.query('DELETE FROM todo WHERE todo_id = $1', [
      id,
    ]);
    res.status(200).json('Todo has been deleted');
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
