"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const todo_list_rotues_1 = require("./routes/todo-list.rotues");
const MongodbConnection_1 = require("./database/connections/MongodbConnection");
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use("/todos", todo_list_rotues_1.createTodoListRouter);
const port = 3000;
// conexión a la base de datos de mongo
(0, MongodbConnection_1.connectionDatabase)();
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
