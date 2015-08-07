Template.transactions.helpers({
    getTemplateName: function () {
        return Session.get('transactionsPanelTemplate') || 'transactionsPanel'
    },
    getTemplateData: function () {
        return [];
    }
});
