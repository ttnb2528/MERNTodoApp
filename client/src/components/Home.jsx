import React, { useEffect, useState } from "react";
import Header from "./partials/Header.jsx";
import Todo from "./partials/Todo.jsx";
import AddTodoApp from "./partials/AddTodoApp.jsx";
import { useNavigate } from "react-router-dom";
import { getToken } from "../services/Todos/getToken.js";
import { API_LIST_TODO } from "../services/Todos/List.api.js";
import { ToastContainer } from "react-toastify";
import EditTodoApp from "./partials/EditTodoApp.jsx";

const Home = () => {
  const navigation = useNavigate();
  const [list, setList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [editTodo, setEditTodo] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [search, setSearch] = useState("");
  useEffect(() => {
    if (!getToken()) {
      navigation("/login");
    }

    fetchTodoList();
  }, [navigation, refresh]);

  useEffect(() => {
    if (search === "") {
      setFilteredList(list);
    } else {
      const filterList = list.filter((todo) =>
        todo.desc.toLowerCase().includes(search.toLowerCase().trim())
      );
      setFilteredList(filterList);
    }
  }, [list, search]);

  const fetchTodoList = async () => {
    const result = await API_LIST_TODO(getToken());
    if (result.status === 200 && result.data.status === 200) {
      setList(result.data.data.todos.reverse());
    }
  };
  return (
    <div>
      <Header search={search} setSearch={setSearch} />
      <ToastContainer />

      <div className="container">
        <div className="row justify-content-md-center mt-4 gap-4">
          {filteredList.map((todo) => {
            return (
              <Todo
                key={todo._id}
                todo={todo}
                setRefresh={setRefresh}
                setEditTodo={setEditTodo}
              />
            );
          })}

          {filteredList.length === 0 && (
            <h4 className="text-center col-sm-2 alert alert-warning">
              No Todos Found
            </h4>
          )}
        </div>
      </div>

      <div
        className=""
        style={{ position: "fixed", right: 50, bottom: 50, zIndex: 1030 }}
      >
        <button
          type="button"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          className="btn btn-outline-light"
        >
          Add
        </button>
      </div>

      <AddTodoApp setRefresh={setRefresh} />
      <EditTodoApp editTodo={editTodo} setRefresh={setRefresh} />
    </div>
  );
};

export default Home;
