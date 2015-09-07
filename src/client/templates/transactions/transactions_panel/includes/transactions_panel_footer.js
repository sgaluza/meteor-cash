Template.transactionsPanelFooter.helpers({
    removeButtonOn: function () {
        return Router.current().route.getName() === 'transactions.update';
    }
});

Template.transactionsPanelFooter.events({
    'click #saveTransactionButton': function () {
        Router.go('transactions');
    },
    'click #cancelTransactionButton': function () {
        Router.go('transactions');
    },
    'click #removeTransactionButton': function () {
        Transactions.remove({_id: Router.current().params.id});
        Router.go('transactions');
    }
});