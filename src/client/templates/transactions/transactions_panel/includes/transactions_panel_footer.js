Template.transactionsPanelFooter.helpers({
    removeButtonOn: function () {
        return Router.current().route.getName() === 'transactions.update';
    }
});

Template.transactionsPanelFooter.events({
    'click #saveTransactionButton': function (event) {
        if (Router.current().route.getName() === 'transactions.update') {
            Router.go('/transactions/add/expense');
        }
        else {
            Session.set('transactions_accountId', null);
            Session.set('transactions_accountToId', null);
        }
    },
    'click #cancelTransactionButton': function (event) {
        if (Router.current().route.getName() === 'transactions.update') {
            Router.go('/transactions/add/expense');
        }
        else {
            Session.set('transactions_accountId', null);
            Session.set('transactions_accountToId', null);
            event.delegateTarget.reset();
        }
    },
    'click #removeTransactionButton': function () {
        Transactions.remove({_id: Router.current().params.id});
        Router.go('/transactions/add/expense');
    }
});