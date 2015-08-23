Template.transactionsPanelTransfer.events({
    'click #addNotes': function () {
        $('textarea[name=notes]').removeClass('hidden');
    }
});

Template.transactionsPanelTransferUpdate.helpers({
    'notesOn': function () {
        return _.has(Transactions.findOnd({_id: Router.current().params.id}), 'notes');
    }
});