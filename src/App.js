import "./App.css";
import { useEffect, useState } from "react";
import Header from "./Components/Header";
function App() {
  const [todo, setTodo] = useState("");
  const [activeTodo, setActiveTodo] = useState(
    localStorage.getItem("activeTodo")
      ? JSON.parse(localStorage.getItem("activeTodo"))
      : []
  );
  const [removedTodo, setRemovedTodo] = useState(
    localStorage.getItem("removedTodo")
      ? JSON.parse(localStorage.getItem("removedTodo"))
      : []
  );
  useEffect(() => {
    localStorage.setItem("activeTodo", JSON.stringify(activeTodo));
    localStorage.setItem("removedTodo", JSON.stringify(removedTodo));
  }, [activeTodo, removedTodo]);

  const handleInputSubmit = (e) => {
    e.preventDefault();
    if (todo !== "") {
      setActiveTodo([
        ...activeTodo,
        { id: Date.now(), text: todo, status: false },
      ]);
    }
    setTodo("");
  };

  const handleRemove = (data) => {
    setRemovedTodo([...removedTodo, data]);
    var items = activeTodo.filter((item) => {
      return item !== data;
    });
    setActiveTodo(items);
  };

  return (
    <div>
      <Header />
      <div className="headerDiv">
        <form onSubmit={handleInputSubmit}>
          <input
            type="text"
            className="todosInput"
            placeholder="🖊️ Add Items..."
            onChange={(e) => setTodo(e.target.value)}
            value={todo}
          />
          <span onClick={handleInputSubmit} className="addButton">
            <i className="fa fa-plus fa-lg"></i>
          </span>
        </form>
      </div>
      <div className="todoDiv">
        <div className="activeTodos todos_box">
          <p className="todoTitle">Active List</p>
          <div className="todos">
            {activeTodo.map((data, key) => {
              if (!data.status) {
                return (
                  <div key={key} className="todo">
                    <input
                      type="checkbox"
                      name="checkbox"
                      className="checkbox"
                      checked={data.status}
                      onChange={(e) => {
                        setActiveTodo(
                          activeTodo.filter((obj) => {
                            if (obj.id === data.id) {
                              obj.status = e.target.checked;
                            }
                            return obj;
                          })
                        );
                      }}
                    />
                    <span className="todoItem">{data.text}</span>
                    <span
                      onClick={() => {
                        window.confirm("removed items can't be restored") &&
                          handleRemove(data);
                      }}
                      className="closeButton delete"
                    >
                      Reject
                    </span>
                  </div>
                );
              }
              return null;
            })}
          </div>
        </div>
        <div className="completedTodos todos_box">
          <p className="todoTitle">Completed List</p>
          <div className="todos">
            {activeTodo.map((data, key) => {
              if (data.status) {
                return (
                  <div key={key} className="todo">
                    <input
                      type="checkbox"
                      name="checkbox"
                      className="checkbox"
                      checked={data.status}
                      onChange={(e) => {
                        setActiveTodo(
                          activeTodo.filter((obj) => {
                            if (obj.id === data.id) {
                              obj.status = e.target.checked;
                            }
                            return obj;
                          })
                        );
                      }}
                    />
                    <span className="todoItem">{data.text}</span>
                    <span
                      onClick={() => {
                        let isDelete = window.confirm(
                          "deleted items can't be restored"
                        );
                        if (isDelete) {
                          var items = activeTodo.filter((item) => {
                            return item !== data;
                          });
                          setActiveTodo(items);
                        }
                      }}
                      className="closeButton delete"
                    >
                      Delete
                    </span>
                  </div>
                );
              }
              return null;
            })}
          </div>
        </div>
        <div className="removedTodos todos_box">
          <p className="todoTitle">Rejected List</p>
          <div className="todos">
            {removedTodo.map((data, key) => {
              return (
                <div key={key} className="todo">
                  <span className="todoItem">{data.text}</span>
                  <span
                    onClick={() => {
                      let isDelete = window.confirm(
                        "deleted items can't be restored"
                      );
                      if (isDelete) {
                        var items = removedTodo.filter((item) => {
                          return item !== data;
                        });
                        setRemovedTodo(items);
                      }
                    }}
                    className="closeButton delete"
                  >
                    Delete
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="developer-info">
        <p>
          developed by{" "}
          <a href="http://inluxi.com" rel="noreferrer" target="_blank">
            Arun Jojo
          </a>
        </p>
      </div>
    </div>
  );
}

export default App;