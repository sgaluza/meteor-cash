Template.accounts.helpers({
    accounts: function () {
        return Accounts.find();
    },
    currency: function (currencyId) {
        return _.find(currencies, {cc: currencyId}) || {symbol: '', name: ''};
    }
});

Template.accounts.events({
    'click #createAccount': function () {
        $('#accountsModalCreate').modal();
    },
    'click #updateAccount': function (event) {
        event.preventDefault();

        var currentTarget = event.currentTarget;

        Session.set('accounts_updatedId', currentTarget.hash ? currentTarget.hash.slice(1) : '');
        $('#accountsModalUpdate').modal();
    }
});

