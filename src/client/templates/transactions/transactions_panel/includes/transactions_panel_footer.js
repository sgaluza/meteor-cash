Template.transactionsPanelFooter.helpers({
    showRemoveButton: function () {
        return Session.get('transactionsPanelTemplate') === 'transactionsPanelYieldUpdate';
    }
});

Template.transactionsPanelFooter.events({
    'click #saveTransactionButton': function () {
        Session.set('transactionsPanelTemplate', null)
    },
    'click #cancelTransactionButton': function () {
        Session.set('transactionsPanelTemplate', null);
    },
    'click #removeTransactionButton': function () {
        Transactions.remove({_id: Session.get('transactionsTableSelectedId')});
        Session.set('transactionsTableSelectedId', null);
        Session.set('transactionsPanelTemplate', null);
    }
});