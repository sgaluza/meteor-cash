Template.categoriesModalCreate.events({
    'submit form': function () {
        var validatedName = AutoForm.getFieldValue('name', 'insertCategory');

        if (AutoForm.validateForm('insertCategory') && !Categories.findOne({name: validatedName})) {
            $('#categoriesModalCreate').modal('hide');
        }
    }
});