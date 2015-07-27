Template.categoryEditModal.helpers({
    categories: function(){
        return Categories.find();
    }
});

Template.categoryEditModal.onRendered(function(){
    $('input[name=title]').focus();
});

Template.categories.onRendered(function(){
    $('#tree').treeview({data:  [
        {
            text: "Parent 1",
            nodes: [
                {
                    text: "Child 1",
                    nodes: [
                        {
                            text: "Grandchild 1"
                        },
                        {
                            text: "Grandchild 2"
                        }
                    ]
                },
                {
                    text: "Child 2"
                }
            ]
        },
        {
            text: "Parent 2"
        },
        {
            text: "Parent 3"
        },
        {
            text: "Parent 4"
        },
        {
            text: "Parent 5"
        }
    ]});
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