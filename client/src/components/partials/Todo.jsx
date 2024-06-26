import React, { useState } from "react";
import moment from "moment";
import { API_DELETE_TODO } from "../../services/Todos/delete.api.js";
import { getToken } from "../../services/Todos/getToken.js";
import { toast } from "react-toastify";
// import { API_MARK_TODO } from "../../services/Todos/mark.api.js";

// icons
import { FaTrash, FaEdit } from "react-icons/fa";

function Todo({ todo, setRefresh, setEditTodo }) {
  const [show, setShow] = useState(false);
  let token = getToken();

  const handleDelete = async () => {
    const result = await API_DELETE_TODO(token, {
      todo_id: todo._id,
    });

    if (result.data.status === 200) {
      toast("Todo Deleted Successfully");
      setRefresh(new Date());
    } else {
      toast("Failed Deleting Todo, Please try again");
    }
  };

  const handleEditTodo = (todo) => {
    setEditTodo(todo);
  };

  // const handleMarkTodo = async () => {
  //   const result = await API_MARK_TODO(token, {
  //     todo_id: todo._id,
  //   });

  //   if (result.data.status === 200) {
  //     setRefresh(new Date());
  //     toast(result.data.message);
  //   } else {
  //     toast("Failed to Mark, Please try again");
  //   }
  // };

  return (
    <div className="col-lg-5 col-md-4 alert bg-light d-flex justify-content-between">
      {/* <div className="card-header p-2">
        {todo.isCompleted ? "Completed" : "Not Completed"}
      </div> */}

      <div className="card-body">
        <a
          href={todo.link}
          target="_blank"
          rel="noreferrer"
          className="card-title"
          style={{
            textDecoration: "none",
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: "1",
            overflow: "hidden",
            fontSize: "18px",
            fontWeight: 600,
          }}
        >
          {todo.desc}
        </a>
        {/* <p className="card-text mt-2" style={{ fontSize: "14px" }}>
          {moment(todo.date).fromNow()}
        </p> */}
      </div>

      <div className="actionButtons float-end">
        <div className="d-flex align-items-center gap-2">
          <div
            data-bs-toggle="modal"
            data-bs-target="#exampleModal1"
            onClick={() => handleEditTodo(todo)}
          >
            <FaEdit />
          </div>
          <div className="deleteButton" onClick={handleDelete}>
            <FaTrash />
          </div>
        </div>

        {/* <div className="markTodo" onClick={handleMarkTodo}>
          <button>
            {todo.isCompleted ? "Mark UnCompleted" : "Mark Completed"}
          </button>
        </div> */}
      </div>
    </div>
  );
}

export default Todo;
