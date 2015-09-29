Template.accounts.helpers({
    currency: function (currencyId) {
        return _.find(currencies, function(c){return c.code == currencyId});
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
    'click a.account-delete': function () {
        AutoForm.resetForm('deleteAccount');
        $('#accountsModalDelete').modal();
    },
    'mouseenter li.account-item': function (event) {
        $(event.currentTarget).find('div.pull-right').show();
    },
    'mouseleave li.account-item': function (event) {
        $(event.currentTarget).find('div.pull-right').hide();
    }
});