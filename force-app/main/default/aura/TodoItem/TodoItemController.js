({
	fireDeleteTodoEvent: function(component, event, helper) {
		var todoToDelete = component.get("v.todo");
        var createEvent = component.getEvent("todoDeleted");
  		createEvent.setParams({ "todo": todoToDelete }).fire();
	},

	fireUpdateTodoEvent: function(component, event, helper) {
		var todoToUpdate = component.get("v.todo");
        var createEvent = component.getEvent("todoUpdated");
  		createEvent.setParams({ "todo": todoToUpdate }).fire();
	}
})