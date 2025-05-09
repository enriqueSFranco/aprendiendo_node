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

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// routes
app.get('/', taskController.getAllTasks)
app.get('/add', taskController.getAddTaskForm)
app.post('/add', taskController.addNewTask)
app.get('/edit', taskController.getEditTaskForm)
app.patch('/edit/:id', taskController.editTask)
app.get('/complete', taskController.completeTask)
app.get('/uncomplete', taskController.uncompleteTask)
app.delete('/delete/:id', taskController.deleteTask)

app.use(errorController.error404)

app.listen(PORT, () => {
  console.log(`serever listening on port ${PORT}`)
})