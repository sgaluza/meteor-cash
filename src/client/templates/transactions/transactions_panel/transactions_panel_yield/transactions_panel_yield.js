Template.transactionsPanelYieldUpdate.helpers({
    getSelectedRow: function () {
        return Transactions.findOne({_id: Session.get('transactionTableSelectedId')});
    }
});