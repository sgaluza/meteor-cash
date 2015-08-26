Template.accounts.helpers({
    currency: function (currencyId) {
        return Currencies.findOne({code: currencyId});
    }
});

Template.accounts.events({
    'click #createAccount': function () {
        AutoForm.resetForm('insertAccount');
        $('#accountsModalCreate').modal();
    },
    'click a.account-edit': function () {
        AutoForm.resetForm('updateAccount');
        $('#accountsModalUpdate').modal();
    },
    'mouseenter li.account-item': function (event) {
        $(event.currentTarget).find('div.pull-right').show();
    },
    'mouseleave li.account-item': function (event) {
        $(event.currentTarget).find('div.pull-right').hide();
    }
});