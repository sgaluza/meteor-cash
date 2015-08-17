Template.transactionsPanelDefault.events({
    'click #addTransactionButton': function (event) {
        //Session.set('transactions_panelTemplate', 'transactionsPanelYield');
        event.preventDefault();

        Router.go('/transactions/add/yield');
    }
});