Template.transactionsModalDelete.events({
    'click .modal-footer button[type="button"]': function () {
        var transaction = Transactions.findOne({'_id' : Router.current().params.id}),
            user = _.result(Accounts.findOne(transaction.account), 'name'),
            currencyId = _.result(Accounts.findOne(transaction.account), 'currencyId'),
            currency = _.result(_.find(currencies, function(c){return c.code == currencyId}), 'symbol'),
            category = '',
            type = '';
        Transactions.remove({_id: Router.current().params.id});
        $('#transactionsModalDelete').modal('hide');
        $('body').removeClass('modal-open');
        $('.modal-backdrop').remove();
        if (transaction.type == 2) {
            type = 'Expense';
        } else if (transaction.type == 1) {
            type = 'Income';
        } else if (transaction.type == 3) {
            type = 'Transfer';
        }
        if (transaction.categories) {
            var category = ' (category: <strong>' + _.result(Categories.findOne(transaction.categories), 'title') + '</strong>)';
        }
        alertify.log('<strong>' + type + '</strong> Transaction (<strong>' + transaction.amount + ' ' + currency + '</strong>) for account <strong>' + user + '</strong>' + category + ' was deleted');
        Router.go('/transactions/add/expense');
    }
});