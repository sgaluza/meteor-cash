Template.transactionsPanelTransfer.events({
    'change select[name=account]': function () {
        var accountId = $('select[name=account]').val();
        Session.set('transactions_accountId', accountId);
    },
    'change select[name=accountTo]': function () {
        var accountToId = $('select[name=accountTo]').val();
        Session.set('transactions_accountToId', accountToId);
    }
});

Template.transactionsPanelTransferUpdate.events({
    'change select[name=account]': function () {
        var accountId = $('select[name=account]').val();
        Session.set('transactions_accountId', accountId);
    },
    'change select[name=accountTo]': function () {
        var accountToId = $('select[name=accountTo]').val();
        Session.set('transactions_accountToId', accountToId);
    }
});

Template.transactionsPanelTransferUpdate.helpers({
    'notesOn': function () {
        return _.has(Transactions.findOne({_id: Router.current().params.id}), 'notes');
    }
});