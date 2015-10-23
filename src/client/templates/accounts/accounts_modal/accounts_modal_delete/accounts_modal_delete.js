Template.accountsModalDelete.helpers({
    deleteAccount: function () {
        return Accounts.findOne({_id: Iron.controller().getParams().hash});
    }
});

Template.accountsModalDelete.events({
    'submit form': function () {
        var accountToReAssigned = AutoForm.getFieldValue('names', 'deleteAccount'),
            currentUser = Accounts.findOne({_id: Iron.controller().getParams().hash}),
            userTransactions = _.filter(Transactions.find().fetch(), {'account' : currentUser._id}),
            account = Accounts.findOne({'_id' : Iron.controller().getParams().hash}),
            currency = _.result(_.find(currencies, function(c){return c.code == account.currencyId}), 'symbol');

        if (accountToReAssigned && userTransactions) {
            _.forEach(userTransactions, function(transaction){
                Transactions.update(transaction._id, {$set: {'account' : accountToReAssigned}});
            });
        } else {
            _.forEach(userTransactions, function(transaction){
                Transactions.remove(transaction._id);
            });
        }
        Accounts.remove({_id: currentUser._id});
        $('#accountsModalDelete').modal('hide');

        alertify.log('Account <strong>' + account.name + '</strong> with balance <strong>' + account.balance + ' ' + currency + '</strong> was deleted');
        Router.go('accounts');
    }
});