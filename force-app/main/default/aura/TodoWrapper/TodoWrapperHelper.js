({
	saveTodo: function(component, todo, callback) {
	    var action = component.get("c.saveTodo");
	    action.setParams({
	        "todo": todo
	    });
	    if (callback) {
	        action.setCallback(this, callback);
	    }
	    $A.enqueueAction(action);
	},

	createTodo: function(component, todo) {
	    this.saveTodo(component, todo, function(response){
	        var state = response.getState();
	        if (component.isValid() && state === "SUCCESS") {
	            var todos = component.get("v.todos");
	            todos.push(response.getReturnValue());
	            component.set("v.todos", todos);
	            this.calculateCount(component);
	        }
	    });
	},

	updateTodo: function(component, todo) {
	    this.saveTodo(component, todo);
	    this.calculateCount(component);
	},

	deleteTodo: function(component, todo) {
	    var action = component.get("c.deleteTodo");
	    action.setParams({
	        "todo": todo
	    });
	    action.setCallback(this, function(response) {
            if (component.isValid() && response.getState() === "SUCCESS") {
            	//If deletion is success, removing todo from displayed list
                var uiTodoList = component.get("v.todos");
                var deletedTodo = response.getReturnValue();
                var newTodoList = []
                uiTodoList.forEach( function(todo) { 
				    if(todo.Id != deletedTodo.Id){
				    	newTodoList.push(todo);
				    }
				});
				component.set("v.todos", newTodoList);
				this.calculateCount(component);
            }
        });
        $A.enqueueAction(action);
	},

	calculateCount: function(component, todoList){
		//Calculating open and completed todo count
		var completeCount = 0;
		var openCount = 0;
		todoList = component.get("v.todos");
		for(var i=0; i<todoList.length; i++){
			var todo = todoList[i];
			if(todo.Completed__c){
				completeCount++;
			}else{
				openCount++;
			}
		}
	}
})