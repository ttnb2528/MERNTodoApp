import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { API_EDIT_TODO } from "../../services/Todos/Edit.api.js";
import { getToken } from "../../services/Todos/getToken.js";

function EditTodoApp({ editTodo, setRefresh }) {
  const [form, setForm] = useState({
    todo_id: "",
    desc: "",
    link: "",
  });

  useEffect(() => {
    if (editTodo) {
      setForm({
        todo_id: editTodo._id,
        desc: editTodo.desc,
        link: editTodo.link,
      });
    }
  }, [editTodo]);

  // console.log(form);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleTodoSubmit = async () => {
    console.log(form.desc);
    if (form.desc === "" || form.link === "") {
      toast("Todo or link is required");
      return;
    }

    let token = getToken();

    const result = await API_EDIT_TODO(token, form);
    console.log(result);
    if (result.status === 200 && result.data.status === 200) {
      toast("Todo updated successfully");
      setRefresh(new Date());
      setForm({ desc: "", link: "" });
    } else {
      toast(result.data.message);
    }
  };
  return (
    <div className="modal mt-5" id="exampleModal1">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <div className="modal-title">Edit Todo</div>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="close"
            >
              <span aria-hidden="true"></span>
            </button>
          </div>

          <div className="modal-body">
            <div className="form-group">
              <textarea
                name="desc"
                className="form-control"
                rows={3}
                onChange={handleChange}
                value={form.desc}
                placeholder="Enter Todos...."
              ></textarea>
            </div>

            <div className="form-group mt-2">
              <input
                type="text"
                className="form-control"
                name="link"
                value={form.link}
                onChange={handleChange}
                placeholder="Enter Link..."
              />
            </div>
          </div>

          <div className="modal-footer">
            <button
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              onClick={() => setForm({ desc: "", link: "" })}
            >
              Close
            </button>
            <button
              className="btn btn-secondary"
              onClick={handleTodoSubmit}
              data-bs-dismiss="modal"
            >
              Save Todo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditTodoApp;
