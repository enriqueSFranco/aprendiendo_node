import express from "express";
import bodyParser from "body-parser";
import { createTodoListRouter } from "./routes/todo-list.rotues";
import { connectionDatabase } from "./database/connections/MongodbConnection";

const app = express();
app.use(bodyParser.json());
app.use("/todos", createTodoListRouter);

const port = 3000;

// conexión a la base de datos de mongo
connectionDatabase();

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
