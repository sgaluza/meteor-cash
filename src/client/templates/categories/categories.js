Template.categoryEditModal.helpers({
    categories: function(){
        return Categories.find();
    }
});

Template.categoryEditModal.onRendered(function(){
    $('input[name=title]').focus();
});


Template.categories.events({
    "click #add-category": function() {
        Bootstrap3boilerplate.Modal.dynamicTemplate.set("categoryEditModal");
        Bootstrap3boilerplate.Modal.formId.set("categoryEdit");
        Bootstrap3boilerplate.Modal.title.set("Add Category");
        Bootstrap3boilerplate.Modal.show();
        $('input[name=title]').focus();
    }
});