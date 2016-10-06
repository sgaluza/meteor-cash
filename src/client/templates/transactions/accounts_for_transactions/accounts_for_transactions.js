Template.listAccounts.helpers({
    accounts: function () {
        var accounts = Accounts.find({},{sort:{order:1}}).fetch();

        return _.forEach(accounts, function(account) {
            var transactions = Transactions.find({
                $or:
                    [
                        {'accountTo': account._id},
                        {'account': account._id}
                    ]}).fetch();

            _.forEach(transactions, function(t){
                if (t.amount && t.amountTo && t.account === account._id && t.accountTo === account._id){
                    account.balance += (t.amountTo - t.amount);
                }
                else if(t.amount && t.account === account._id){
                    account.balance -= t.amount;
                }
                else if(t.amountTo && t.accountTo === account._id){
                    account.balance += t.amountTo;
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