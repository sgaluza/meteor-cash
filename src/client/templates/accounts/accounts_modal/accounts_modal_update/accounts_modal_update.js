Template.accountsModalUpdate.helpers({
    updatedDoc: function () {
        return Accounts.findOne({_id: Session.get('accounts_updatedId')});
    }
});

Template.accountsModalUpdate.events({
    'submit form': function () {
        if (AutoForm.validateForm('updateAccount')) {
            $('#accountsModalUpdate').modal('hide');
        }
    }
});