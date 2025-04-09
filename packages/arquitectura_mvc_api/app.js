import path from 'node:path'
import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import morgan from 'morgan'
import taskController from './controllers/taskController.js'
import errorController from './controllers/errorController.js'

const PORT = process.env.PORT ?? 3001
const __dirname = process.cwd()

const app = express()

// middlewares
app.use(helmet())
app.use(cors())
app.use(morgan("dev"))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// routes
app.get('/tasks', taskController.getAllTasks)
app.get('/task/:id', taskController.getTaskById)
app.post('/tasks/add', taskController.addNewTask)
app.patch('/tasks/edit/:id', taskController.editTask)
app.patch('/tasks/complete', taskController.completeTask)
app.patch('/tasks/uncomplete', taskController.uncompleteTask)
app.delete('/tasks/delete/:id', taskController.deleteTask)

app.use(errorController.error404)

app.listen(PORT, () => {
  console.log(`serever listening on port http://localhost:${PORT}/tasks`)
})