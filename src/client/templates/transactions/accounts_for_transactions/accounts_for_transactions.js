Template.listAccounts.helpers({
    accounts: function () {
        var accounts = Accounts.find().fetch();

        return _.forEach(accounts, function(account) {
            account.balance = accounting.formatNumber(account.balance, 2);
        });
    }
});
Template.listAccounts.rendered = function() {
    $('.accounts-list').mCustomScrollbar({
        theme: 'minimal-dark'
    });
};