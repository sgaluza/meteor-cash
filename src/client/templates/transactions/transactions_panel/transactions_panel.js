var defaultPanelTemplate = 'transactionsPanelInactive';

Template.transactionsPanel.helpers({
    transactionsPanelTemplate: function () {
        return Session.get('transactions_panelTemplate') || defaultPanelTemplate;
    },
    transactionsPanelHeaderOn: function () {
        var currentTemplate = Session.get('transactions_panelTemplate');

        return !!currentTemplate && currentTemplate !== defaultPanelTemplate;
    }
});