Template.accountsModalUpdate.helpers({
    updatedDoc: function () {
        return Accounts.findOne({_id: Iron.controller().getParams().hash});
    }
});

Template.accountsModalUpdate.events({
    'submit form': function () {
        if (AutoForm.validateForm('updateAccount')) {
            $('#accountsModalUpdate').modal('hide');
        }
    }
});