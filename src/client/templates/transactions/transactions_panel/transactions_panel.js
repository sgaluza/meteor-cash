Template.transactionsPanel.helpers({
    transactionsPanelOn: function () {
        var currentRoute = Router.current().route.getName() || '';

        return currentRoute.slice(0, 13) === 'transactions.';
    }
});