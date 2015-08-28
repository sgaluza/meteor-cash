Template.categoriesModalUpdate.helpers({
    updatedDoc: function () {
        return Categories.findOne({_id: Session.get('categories_updatedId')});
    }
});

Template.categoriesModalUpdate.events({
    'submit form': function () {
        var validatedName = AutoForm.getFieldValue('name', 'updateCategory');

        if (AutoForm.validateForm('updateCategory') && !Categories.findOne({name: validatedName})) {
            $('#categoriesModalUpdate').modal('hide');
        }
    }
});