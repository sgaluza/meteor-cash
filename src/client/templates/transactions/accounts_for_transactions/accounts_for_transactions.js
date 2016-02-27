Template.listAccounts.helpers({
    accounts: function () {
        var accounts = Accounts.find().fetch();

        return _.forEach(accounts, function(account) {
            var transactions = Transactions.find({
                $or:
                    [
                        {'accountTo': account._id},
                        {'account': account._id}
                    ]}).fetch();

            _.forEach(transactions, function(t){
                if(t.type === 1) {
                    account.balance += t.amount
                } else if(t.type === 2) {
                    account.balance -= t.amount
                } else if(t.type === 3) {
                    if (t.accountTo === account._id) {
                        account.balance += t.amount
                    } else {
                        account.balance -= t.amount
                    }
                }
            });


            account.balance = accounting.formatNumber(account.balance, 2);
        });
    }
});
Template.listAccounts.rendered = function() {
    $('.accounts-list').mCustomScrollbar({
        theme: 'minimal-dark'
    });
};