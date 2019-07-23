/*jshint esversion: 6 */

$(document).ready( () => {

  const display = $('#display');
  const form = $('#form');
  const todoUserInput = $('#todoUserInput');

  const resetTodosInput() => {
    todoUserInput.val('');
  };

  const buildIDS = (crud_todo) => {
    return {
      editID : "edit_" + crud_todo._id,
      deleteID : "delete_" + crud_todo._id,
      listItemID : "listItem_" + crud_todo._id,
      todoID : "todo_" + crud_todo._id
    };
  };

  

});