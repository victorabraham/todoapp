({
	fireNewTodoEvent: function(component, event, helper) {
        var newTodo = component.get("v.newTodo");

        console.log("Create Todo: " + JSON.stringify(newTodo));

        // Task description must not be blank
	    var descriptionField = component.find("description");
	    var description = descriptionField.get("v.value");
	    if ($A.util.isEmpty(description)){
	        descriptionField.set("v.errors", [{message:"Please enter some description"}]);
	    }
	    else {
	        descriptionField.set("v.errors", null);
	        var createEvent = component.getEvent("todoAdded");
	        newTodo.Completed__c = false;
      		createEvent.setParams({ "todo": newTodo }).fire();
	    }
	}
})