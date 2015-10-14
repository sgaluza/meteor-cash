Template.accountsModalCreate.helpers({
    order: function () {
        return Accounts.find().fetch().length * 10
    }
});