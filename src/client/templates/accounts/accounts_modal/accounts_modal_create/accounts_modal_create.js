Template.accountsModalCreate.events({
    'submit form': function () {
        if (AutoForm.validateForm('insertAccount')) {
            $('#accountsModalCreate').modal('hide');
        }
    }
});