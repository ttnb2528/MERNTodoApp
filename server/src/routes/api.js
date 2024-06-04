import express from "express";
import Register from "../controllers/Register.controller.js";
import { RegisterSchema } from "../ValidatorSchema/RegisterSchema.js";
import Login from "../controllers/Login.controller.js";
import { LoginSchema } from "../ValidatorSchema/LoginSchema.js";
import { createTodo } from "../controllers/Todo.controller.js";
import { check } from "express-validator";
import { GetTodos } from "../controllers/TodoList.controller.js";
import { MarkTodo } from "../controllers/MarkTodo.controller.js";
import { RemoveTodo } from "../controllers/RemoveTodo.controller.js";
import { EditTodo } from "../controllers/EditTodo.controller.js";

const apiRoute = express.Router();
export const apiProtected = express.Router();

apiRoute.post("/register", RegisterSchema, Register);
apiRoute.post("/Login", LoginSchema, Login);

// Protected routes

apiProtected.post(
  "/createTodo",
  [
    check("desc", "Todo desc is required").exists(),
    check("link", "Todo link is required").exists(),
  ],
  createTodo
);

apiProtected.post(
  "/MarkTodo",
  [check("todo_id", "Todo id is required").exists()],
  MarkTodo
);

apiProtected.post(
  "/deleteTodo",
  [check("todo_id", "Todo id is required").exists()],
  RemoveTodo
);

apiProtected.put(
  "/editTodo",
  [
    check("todo_id", "Todo id is required").exists(),
    check("desc", "Description is required").exists(),
    check("link", "Link is required").exists(),
  ],
  EditTodo
);

apiProtected.get("/todoList", GetTodos);

export default apiRoute;
