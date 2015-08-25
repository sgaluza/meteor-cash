Template.accountsModalCreate.events({
    'submit form': function () {
        if (AutoForm.validateForm('insertAccount')) {
            AutoForm.resetForm('insertAccount');
            $('#accountsModalCreate').modal('hide');
        }
    }
});