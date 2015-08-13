Template.transactionsPanelInactive.events({
    'click #addTransactionButton': function () {
        Session.set('transactions_panelTemplate', 'transactionsPanelYield');
    }
});