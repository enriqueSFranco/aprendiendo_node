import express from "express";
import bodyParser from "body-parser";
import { connectionDatabase } from "./database";
import {
  createTodoItem,
  getAllTodoItems,
  updateTodoItem,
  deleteTodoItem,
} from "./todo-list";

const app = express();
app.use(bodyParser.json());

const port = 3000;

// conexión a la base de datos de mongo
connectionDatabase();

app.get("/", (req, res) => {
  res.send({
    ok: true,
    message: "hello world!",
  });
});

app.get("/todos", async (req, res) => {
  try {
    const results = await getAllTodoItems();
    res.status(200).json({ results });
  } catch (error) {
    res.status(500).json({ error });
  }
});

app.post("/todos/:id", async (req, res) => {
  try {
    const body = req.body;
    const { title, description } = body;
    const newTodoItem = { title, description };
    const data = await createTodoItem(newTodoItem);

    res.status(200).json({ data });
  } catch (error) {}
});

app.patch("todos/:id", async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  try {
    const data = await updateTodoItem(id, body);
    res.status(200).json({ data });
  } catch {}
});

app.delete("/todos/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const data = await deleteTodoItem(id);
    res.status(200).json({ data });
  } catch {}
});

// app.notFound((ctx) => {
//   return ctx.text("custom 404 message", 404);
// });
console.log("👋 main.ts is executing");
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
