AutoForm.setDefaultTemplateForType('autoForm', 'plain');

AutoForm.hooks({
    accountCreate: {
        onSuccess: function(){
            Template.accounts.initTree();
            //Bootstrap3boilerplate.Modal.hide();
        }
    },
    accountUpdate: {
        onSuccess: function(){
            Template.accounts.initTree();
            //Bootstrap3boilerplate.Modal.hide();
        }
    },
    categoryEdit: {
        onSuccess: function(){
            Template.categories.initTree();
            //Bootstrap3boilerplate.Modal.hide();
        }
    },
    categoryUpdate: {
        onSuccess: function(){
            Template.categories.initTree();
            //Bootstrap3boilerplate.Modal.hide();
        }
    }
});