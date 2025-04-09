let db = [
  { id: 1, title: 'Hacer ejercicio', completed: false }
]

const addNewTask = (req, res) => {
  const { title } = req.body
  if (!title) {
    return res.status(400).json({ message: 'El título de la tarea es obligatorio.' })
  }

  const newTask = {
    id: db.length + 1,
    title,
    completed: false
  }
  db.push(newTask)
  res.status(201).json({ message: 'Tarea añadida correctamente', task: newTask })
}

const deleteTask = (req, res) => {
  const id = parseInt(req.params.id)
  const taskToDelete = db.find(task => task.id === id)

  if (!taskToDelete)
    return res.status(404).json({ message: `La tarea ${db[id].title} no se encontro en tu registro de tareas.` })

  db = db.filter(task => task.id != id)

  return res.json({ message: `Tarea con ID ${id} ha sido eliminada correctamente.` })
}

const editTask = (req, res) => {
  const id = parseInt(req.params.id)
  const { title } = req.body
  const taskToUpdate = db.find(task => task.id === id)
  // console.log({ taskToUpdate, id })

  if (!taskToUpdate) {
    return res.status(404).json({ message: `La tarea ${db[id].title} no se encontro en tu registro de tareas.` })
  }
  taskToUpdate.title = title
  return res.json({ message: `Tarea con ID ${id} actualizada correctamente.` })
}

const completeTask = (req, res) => {
  const id = parseInt(req.body.id)
  const task = db.find(task => task.id === id)

  if (!task)
    return res.status(404).json({ message: `La tarea ${db[id].title} no se encontro en tu registro de tareas.` })

  task.completed = true
  return res.json({ message: `Tarea con ID ${id} se ha completado.` })
}

const uncompleteTask = (req, res) => {
  const id = parseInt(req.body.id)
  const task = db.find(task => task.id === id)

  if (!task)
    return res.status(404).json({ message: `La tarea ${db[id].title} no se encontro en tu registro de tareas.` })

  task.completed = false
  return res.json({ message: `Tarea con ID ${id} se ha completado.` })
}

const getAllTasks = (req, res) => {
  return res.json(db)
}

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