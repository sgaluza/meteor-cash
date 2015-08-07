var defaultTemplate = 'transactionsPanelInactive';

Template.transactionsPanel.helpers({
    getTransactionsPanelTemplate: function () {
        console.log(Session.get('transactionsPanelTemplate'));
        return Session.get('transactionsPanelTemplate') || defaultTemplate;
    },
    transactionsPanelHeaderOn: function () {
        var currentTemplate = Session.get('transactionsPanelTemplate');

        return !!currentTemplate && currentTemplate !== defaultTemplate;
    }
});