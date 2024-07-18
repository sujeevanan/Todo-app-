import React, { useEffect, useState } from "react";

const Todo = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [todos, setTodos] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const url = "http://localhost:8000";
  const [editId, setEditId] = useState(-1);
  //edit
  const [edittitle, setEditTitle] = useState("");
  const [editdescription, setEditDescription] = useState("");
  //submit
  const HandleSubmit = () => {
    //check the inputs
    setError("");
    if (title.trim() !== "" && description.trim() !== "") {
      fetch(url + "/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description }),
      })
        .then((res) => {
          if (res.ok) {
            //add the item to todos
            setTodos([...todos, { title, description }]);
            setMessage("item added succesfully");
            setTimeout(() => {
              setMessage("");
            }, 3000);
          } else {
            //set error
            setError("Unable to add todo");
          }
        })
        .catch(() => {
          setError("Unable to add todo");
        });
    }
    setTitle("");
    setDescription("");
  };
  //get the items from api
  useEffect(() => {
    getItem();
  }, []);
  const getItem = () => {
    fetch(url + "/todos")
      .then((res) => res.json())
      .then((res) => setTodos(res));
  };
  //edit handle
  const HandleEdit = (item) => {
    setEditId(item._id);
    setEditDescription(item.description);
    setEditTitle(item.title);
  };
  // update
  const HandleUpdate = () => {
    if (edittitle.trim() !== "" && editdescription.trim() !== "") {
      fetch(url + "/todos/" + editId, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: edittitle,
          description: editdescription,
        }),
      })
        .then((res) => {
          if (res.ok) {
            //update the item to todos
            const updatedTodo = todos.map((item) => {
              if (item._id == editId) {
                item.title = edittitle;
                item.description = editdescription;
              }
              return item;
            });
            setTodos(updatedTodo);
            setMessage("item updated succesfully");
            setTimeout(() => {
              setMessage("");
            }, 3000);
            setEditId(-1);
          } else {
            //set error
            setError("Unable to add todo");
          }
        })
        .catch(() => {
          setError("Unable to add todo");
        });
    }
  };

  //handleCancel
  const HandleCancel = () => {
    setEditId(-1);
  };
  //delete
  const HandleDelete = (id) => {
    if (window.confirm("Are you Sure you want to delete?")) {
      fetch(url + "/todos/" + id, {
        method: "DELETE",
      }).then(() => {
        const updatedTodos = todos.filter((item) => item._id !== id);
        setTodos(updatedTodos);
      });
    }
  };

  return (
    <>
      <div className="container bg-success p-4 text-light">
        <h1 className="text-center">Sujee's Todo App</h1>
      </div>
      <div className="row mt-2">
        <h3 className="">Add item</h3>
        {message && <p className="text-success"> {message}</p>}

        <div className="form-group d-flex gap-2">
          <input
            type="text"
            placeholder="Title"
            className="form-control"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <input
            type="text"
            placeholder="description"
            className="form-control"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
          <button className="btn btn-dark" onClick={HandleSubmit}>
            Submit
          </button>
        </div>
        {error && <p className="text-danger">{error}</p>}
      </div>
      <div className="row mt-3">
        <h3>Tasks</h3>
        <div className="col-md-6">
          <ul className="list-group">
            {todos.map((item, index) => (
              <li
                className="list-group-item bg-info d-flex justify-content-between align-items-center my-2"
                key={index}
              >
                <div className="d-flex flex-column me-2 ">
                  {editId === -1 || editId !== item._id ? (
                    <>
                      <span className="fw-bold">{item.title}</span>
                      <span>{item.description}</span>
                    </>
                  ) : (
                    <>
                      <div className="form-group d-flex gap-2 me">
                        <input
                          type="text"
                          placeholder="Title"
                          className="form-control"
                          value={edittitle}
                          onChange={(e) => {
                            setEditTitle(e.target.value);
                          }}
                        />
                        <input
                          type="text"
                          placeholder="description"
                          className="form-control"
                          value={editdescription}
                          onChange={(e) => {
                            setEditDescription(e.target.value);
                          }}
                        />
                      </div>
                    </>
                  )}
                </div>
                <div className="d-flex gap-2">
                  {editId === -1 || editId !== item._id ? (
                    <>
                      <button
                        className="btn btn-warning"
                        onClick={() => {
                          HandleEdit(item);
                        }}
                      >
                        Edit
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="btn btn-warning"
                        onClick={HandleUpdate}
                      >
                        Update
                      </button>
                    </>
                  )}
                  {editId === -1 ? (
                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        HandleDelete(item._id);
                      }}
                    >
                      Delete
                    </button>
                  ) : (
                    <button className="btn btn-danger" onClick={HandleCancel}>
                      Cancel
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Todo;
