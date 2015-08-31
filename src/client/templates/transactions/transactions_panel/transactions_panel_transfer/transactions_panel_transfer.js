Template.transactionsPanelTransfer.events({
    'click #addNotes': function () {
        $('textarea[name=notes]').removeClass('hidden');
    },
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
        return _.has(Transactions.findOnd({_id: Router.current().params.id}), 'notes');
    }
});