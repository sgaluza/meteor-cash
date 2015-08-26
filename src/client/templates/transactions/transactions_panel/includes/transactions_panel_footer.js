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
        Transactions.remove({_id: Session.get('transactions_selectedRow')});

        Session.set('transactions_categoriesTags', []);
    }
});