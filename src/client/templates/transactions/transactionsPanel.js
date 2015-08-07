// Default

Template.transactionsPanel.events({
    'click #addTransactionButton': function () {
        Session.set('transactionsPanelTemplate', 'transactionsPanelInsert');
    }
});

// Insert

Template.transactionsPanelInsert.events({
    'click #saveTransactionButton': function () {
        Session.set('transactionsPanelTemplate', false)
    },
    'click #cancelTransactionButton': function () {
        Session.set('transactionsPanelTemplate', false);
    }
});

// Update

Template.transactionsPanelUpdate.helpers({
    getSelectedRow: function () {
        return Transactions.findOne({_id: Session.get('transactionTableSelectedId')});
    }
});

Template.transactionsPanelUpdate.events({
    'click #saveTransactionButton': function () {
        Session.set('transactionsPanelTemplate', false)
    },
    'click #cancelTransactionButton': function () {
        Session.set('transactionsPanelTemplate', false);
    }
});

// Buttons

Template.transactionPanelButtons.helpers({
    showRemoveButton: function () {
        return Session.get('transactionsPanelTemplate') === 'transactionsPanelUpdate';
    }
});

Template.transactionPanelButtons.events({
    'click #removeTransactionButton': function () {
        Transactions.remove({_id: Session.get('transactionTableSelectedId')});
        Session.set('transactionTableSelectedId', null);
        Session.set('transactionsPanelTemplate', false);
    }
});