const db = [
  { id: 1, title: 'Hacer ejercicio', completed: false }
]

const addNewTask = (req, res) => {
  const newTask = {
    id: db.length + 1,
    title,
    completed: false
  }
  db.push(newTask)
}

const deleteTask = (req, res) => { }

const editTask = (req, res) => { }

const completeTask = (req, res) => { }

const uncompleteTask = (req, res) => { }

const getAllTasks = (req, res) => { }

const getAddTaskForm = (req, res) => { }

const getEditTaskForm = (req, res) => { }

export default {
  addNewTask,
  deleteTask,
  editTask,
  completeTask,
  uncompleteTask,
  getAllTasks,
  getAddTaskForm,
  getEditTaskForm
}