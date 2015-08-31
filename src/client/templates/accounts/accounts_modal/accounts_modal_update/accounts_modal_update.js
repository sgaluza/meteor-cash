Template.accountsModalUpdate.helpers({
    updatedDoc: function () {
        return Accounts.findOne({_id: Iron.controller().getParams().hash});
    }
});

Template.accountsModalUpdate.events({
    'submit form': function () {
        var validatedName = AutoForm.getFieldValue('name', 'updateAccount');

        if (AutoForm.validateForm('updateAccount') && !Accounts.findOne({name: validatedName})) {
            $('#accountsModalUpdate').modal('hide');
        }
    }
});