var resetTransactionsSession = function () {
    if (Meteor.isClient()) {
        Session.set('transactions_accountId', null);
        Session.set('transactions_accountToId', null);
    }
};


