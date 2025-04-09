let db = [
  { id: 1, title: 'Hacer ejercicio', completed: false }
]

const addNewTask = (req, res) => {
  const { title } = req.body
  if (!title) {
    return res.status(400).json({ error: true, message: 'El título de la tarea es obligatorio.' })
  }

  const newTask = {
    id: db.length + 1,
    title,
    completed: false
  }
  db.push(newTask)
  res.status(201).json({ error: false, message: 'Tarea añadida correctamente', task: newTask })
}

const deleteTask = (req, res) => {
  const id = parseInt(req.params.id)
  const taskToDelete = db.find(task => task.id === id)

  if (!taskToDelete)
    return res.status(404).json({ error: true, message: `La tarea ${db[id].title} no se encontro en tu registro de tareas.` })

  db = db.filter(task => task.id != id)

  return res.json({ error: false, message: `Tarea con ID ${id} ha sido eliminada correctamente.` })
}

const editTask = (req, res) => {
  const id = parseInt(req.params.id)
  const { title } = req.body
  const taskToUpdate = db.find(task => task.id === id)
  // console.log({ taskToUpdate, id })

  if (!taskToUpdate) {
    return res.status(404).json({ error: true, message: `La tarea ${db[id].title} no se encontro en tu registro de tareas.` })
  }
  taskToUpdate.title = title
  return res.json({ error: false, message: `Tarea con ID ${id} actualizada correctamente.` })
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
    return res.status(404).json({ error: true, message: `La tarea ${db[id].title} no se encontro en tu registro de tareas.` })

  task.completed = false
  return res.json({ error: false, message: `Tarea con ID ${id} se ha completado.` })
}

const getAllTasks = (req, res) => {
  if (db.length === 0) return res.json({ message: 'No hay tareas por hacer.' })
  return res.json(db)
}

const getTaskById = (req, res) => {
  const id = parseInt(req.params.id)
  const taskIdx = db.findIndex(task => task.id === id)
  const notFound = -1

  if (taskIdx === notFound)
    return res.status(404).json({ message: `No se encontro la tarea '${db[taskIdx].title}'` })

  return res.status(200).json({ task: db[taskIdx] })
}

export default {
  addNewTask,
  deleteTask,
  editTask,
  completeTask,
  uncompleteTask,
  getAllTasks,
  getTaskById
}