/*jshint esversion: 6 */

$(document).ready(() => {
  const display = $("#display");
  const form = $("#form");
  const todoUserInput = $("#todoUserInput");
  const message = $("#message");
  message.hide();
  const displayMessage = (flag, msg) => {
    // successful
    if (flag) {
      message.removeClass("alert-danger");
      message.addClass("alert-success");
      message.html(msg);
      message.show();
    } else {
      message.removeClass("alert-success");
      message.addClass("alert-danger");
      message.html(msg);
      message.show();
    }
  };

  const getTodos = () => {
    fetch("/getTodos", { method: "get" })
      .then(response => {
        return response.json();
      })
      .then(data => {
        displayTodos(data);
        console.log(data);
      });
  };

  getTodos();
  const resetTodosInput = () => {
    todoUserInput.val("");
  };

  const editTodo = (todo, todoID, editID) => {
    let editBtn = $(`#${editID}`);
    editBtn.click(() => {
      fetch(`/${todo._id}`, {
        method: "put",
        headers: {
          "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify({ todo: todoUserInput.val() })
      })
        .then(response => {
          return response.json();
        })
        .then(data => {
          if (data.ok == 1) {
            let todoIndex = $(`#${todoID}`);
            todoIndex.html(data.value.todo);
            resetTodosInput();
          }
        });
    });
  };

  const deleteTodo = (todo, listItemID, deleteID) => {
    let deleteBtn = $(`#${deleteID}`);
    deleteBtn.click(() => {
      fetch(`/${todo._id}`, {
        method: "delete"
      })
        .then(response => {
          return response.json();
        })
        .then(data => {
          if (data.ok == 1) {
            $(`#${listItemID}`).remove();
          }
        });
    });
  };

  const buildIDS = todo => {
    return {
      editID: "edit_" + todo._id,
      deleteID: "delete_" + todo._id,
      listItemID: "listItem_" + todo._id,
      todoID: "todo_" + todo._id
    };
  };

  const buildTemplate = (todo, ids) => {
    return `<li class="list-group-item" id="${ids.listItemID}">
                    <div class="row">
                        <div class="col-md-4" id="${ids.todoID}">${
      todo.crud_todo
    }</div>
                        <div class="col-md-4"></div>
                        <div class="col-md-4 text-right">
                            <button type="button" class="btn btn-secondary" id="${
                              ids.editID
                            }">Edit</button>
                            <button type="button" class="btn btn-danger" id="${
                              ids.deleteID
                            }">Delete</button>
                        </div>
                    </div>
               </li>`;
  };

  const displayTodos = data => {
    data.forEach(crud_todo => {
      let ids = buildIDS(crud_todo);
      display.append(buildTemplate(crud_todo, ids));
      editTodo(crud_todo, ids.todoID, ids.editID);
      deleteTodo(crud_todo, ids.listItemID, ids.deleteID);
    });
  };

  form.submit(e => {
    e.preventDefault();
    fetch("/", {
      method: "post",
      body: JSON.stringify({ todo: todoUserInput.val() }),
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      }
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        if (!data.error) {
          if (data.result.ok == 1 && data.result.n == 1) {
            let ids = buildIDS(data.document);
            display.append(buildTemplate(data.document, ids));
            editTodo(data.document, ids.todoID, ids.editID);
            deleteTodo(data.document, ids.listItemID, ids.deleteID);
            displayMessage(true, data.msg);
          }
        } else displayMessage(false, data.error.message);
        resetTodosInput();
      });
  });
});
