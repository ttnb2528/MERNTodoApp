import { validationResult } from "express-validator";
import { jsonGenerate } from "../utils/helpers.js";
import { StatusCode } from "../utils/constants.js";
import Todo from "../models/Todo.js";
import User from "../models/User.js";

export const EditTodo = async (req, res) => {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    return res.json(
      jsonGenerate(
        StatusCode.VALIDATION_ERROR,
        "Todo or link is empty",
        error.mapped()
      )
    );
  }
  const { desc, link, todo_id } = req.body;

  try {
    const result = await Todo.findByIdAndUpdate(
      todo_id,
      {
        desc,
        link,
      },
      { new: true }
    );

    if (result) {
      return res.json(
        jsonGenerate(StatusCode.SUCCESS, "Todo updated successfully", result)
      );
    }
  } catch (error) {
    return res.json(
      jsonGenerate(
        StatusCode.UNPROCESSABLE_ENTITY,
        "something went wrong",
        result
      )
    );
  }
};
