var Todos = Em.Application.create();

Todos.ApplicationController = Em.Controller.extend();
Todos.ApplicationView = Em.View.extend({
    templateName: 'application'
});


Todos.Todo = Em.Object.extend({
    title: null,
    isDone: false
});

Todos.todosController = Em.ArrayProxy.create({
    content: [],
     
    createTodo: function(title) {
        var todo = Todos.Todo.create({ title: title });
        this.pushObject(todo);        
    },
      
    remaining: function() {
        return this.filterProperty('isDone', false).get('length');
    }.property('@each.isDone'),

  
    allAreDone: function(key, value) {
        //if box is checked, then mark all to-dos as complete.
        if (value !== undefined) {
            this.setEach('isDone', value);
            return value;
        } else {
            //otherwise, check the box if 1) there is at least 1 to-do, and 2) all to-dos are complete.
            return !!this.get('length') && this.everyProperty('isDone', true);
        }
    }.property('@each.isDone'),
    
    clearCompletedTodos: function() {
        this.filterProperty('isDone', true).forEach(this.removeObject, this);
    }      
});

Todos.CreateTodoView = Em.TextField.extend({
    insertNewline: function() {
        var value = this.get('value');
        
        if (value) {
            Todos.todosController.createTodo(value);
            this.set('value', '');
        }
    }
});

Todos.StatsView = Em.View.extend({
    remainingBinding: 'Todos.todosController.remaining',
 
    remainingString: function() {
        var remaining = this.get('remaining');
        return remaining + (remaining === 1 ? " item" : " items");
    }.property('remaining')
});