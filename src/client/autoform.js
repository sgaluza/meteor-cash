AutoForm.hooks({
    categoryEdit: {
        onSuccess: function(){
            Template.categories.initTree();
            Bootstrap3boilerplate.Modal.hide();
        }
    },
    categoryUpdate: {
        onSuccess: function(){
            Template.categories.initTree();
            Bootstrap3boilerplate.Modal.hide();
        }
    },
});