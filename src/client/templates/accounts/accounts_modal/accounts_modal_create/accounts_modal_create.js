Template.accountsModalCreate.events({
    'submit form': function () {
        var validatedName = AutoForm.getFieldValue('name', 'insertAccount');

        if (AutoForm.validateForm('insertAccount') && !Accounts.findOne({name: validatedName})) {
            $('#accountsModalCreate').modal('hide');
        }
    }
});