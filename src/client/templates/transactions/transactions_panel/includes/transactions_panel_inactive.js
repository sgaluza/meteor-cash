Template.transactionsPanelInactive.events({
    'click #addTransactionButton': function () {
        Session.set('transactionsPanelTemplate', 'transactionsPanelYield');
    }
});