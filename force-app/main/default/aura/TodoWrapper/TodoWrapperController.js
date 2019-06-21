({
    // Loading Todos from Salesforce when component is initialized
    doInit: function(component, event, helper) {

        // Create the action
        var action = component.get("c.getTodoList");

        // Adding callback when response is received
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (component.isValid() && state === "SUCCESS") {
                component.set("v.todos", response.getReturnValue());
                helper.calculateCount(component);
                console.log(response.getReturnValue());
            }
            else {
                console.log("Failed with state: " + state);
            }
        });

        // Send action off to be executed
        $A.enqueueAction(action);
    },

    handleTodoCreate: function(component, event, helper) {
        //Handling new Todo event and creating new todo
        var todo = event.getParam("todo");
        helper.createTodo(component, todo);
    },

    handleTodoUpdate: function(component, event, helper) {
        //Handling todo update event and updating todo
        var todo = event.getParam("todo");
        helper.updateTodo(component, todo);
    },

    handleTodoDelete: function(component, event, helper) {
        //Handling deletion of todo and deleting todo
        var todo = event.getParam("todo");
        helper.deleteTodo(component, todo);
    }
})