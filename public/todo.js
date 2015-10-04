angular.module('todoApp', [])
      .controller('TodoListController', function() {
        var todoList = this;
        todoList.todos = [
          {text:'Task 1', done:true},
          {text:'Task 2', done:true}];
     
        todoList.addTodo = function() {
          todoList.todos.push({text:todoList.todoText, done:false});
          todoList.todoText = '';
        };
     
        todoList.remaining = function() {
          var count = 0;
          angular.forEach(todoList.todos, function(todo) {
            count += todo.done ? 0 : 1;
          });
          return count;
        };
     
        todoList.archive = function() {
          var oldTodos = todoList.todos;
          todoList.todos = [];
          angular.forEach(oldTodos, function(todo) {
            if (!todo.done) todoList.todos.push(todo);
          });
        };
      });

mongoose.module('Tasks')
  var mongoose = require('mongoose');
  var Schema = mongoose.Schema;

  var taskSchema = new Schema({
    user: String, 
    task: String,
    dateCreated: {type: Date, default: Date.now },
    dateDue: { type: Number, min: dateCreated, max: },
    worth: Number,
    status: Boolean,
  })
  
  // creating a model - ready to go 
  var Tasks = mongoose.model('Tasks', taskSchema);



