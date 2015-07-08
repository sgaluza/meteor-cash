Template.categoryEditModal.helpers({
    categories: function(){
        return Categories.find();
    }
});

Template.categoryEditModal.events({
    "keypress form": function (e) {
        var code = e.keyCode || e.which;
        if (code == 13) {
            e.preventDefault();
            return false;
        }
    }

});


Template.categories.events({
    "click #add-category": function(){
        Bootstrap3boilerplate.Modal.dynamicTemplate.set("categoryEditModal");
        Bootstrap3boilerplate.Modal.formId.set("categoryEdit");
        Bootstrap3boilerplate.Modal.title.set("Add Category");
        Bootstrap3boilerplate.Modal.show();
    },
});