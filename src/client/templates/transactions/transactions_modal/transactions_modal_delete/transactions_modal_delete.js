Template.transactionsModalDelete.events({
    'click .modal-footer button[type="button"]': function () {
        Transactions.remove({_id: Router.current().params.id});
        $('#transactionsModalDelete').modal('hide');
        $('body').removeClass('modal-open');
        $('.modal-backdrop').remove();
        Router.go('/transactions/add/expense');
    }
});