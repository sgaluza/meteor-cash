Template.accountsModalDelete.helpers({
    deleteAccount: function () {
        return Accounts.findOne({_id: Iron.controller().getParams().hash});
    }
});

Template.accountsModalDelete.events({
    'submit form': function () {
        var accountToReAssigned = AutoForm.getFieldValue('names', 'deleteAccount'),
            currentUser = Accounts.findOne({_id: Iron.controller().getParams().hash}),
            userTransactions = Transactions.find({$or: [{'account' : currentUser._id}, {'accountTo' : currentUser._id}]}).fetch(),
            account = Accounts.findOne({'_id' : Iron.controller().getParams().hash}),
            currency = _.result(_.find(currencies, function(c){return c.code == account.currencyId}), 'symbol');

        if (accountToReAssigned && userTransactions) {
            _.forEach(userTransactions, function(transaction){
                /*if (transaction.type == 2) {
                    Accounts.update({_id: accountToReAssigned}, {$inc: {balance: -transaction.amount}});
                } else if (transaction.type == 1) {
                    Accounts.update({_id: accountToReAssigned}, {$inc: {balance: transaction.amount}});
                } else if (transaction.type == 3) {
                    Accounts.update({_id: accountToReAssigned}, {$inc: {balance: -transaction.amount}});
                    Accounts.update({_id: accountToReAssigned}, {$inc: {balance: transaction.amountTo}});
                }*/
                var $set = {};
                if (transaction.account && transaction.account == currentUser._id){
                    $set['account'] = accountToReAssigned;
                }
                if (transaction.accountTo && transaction.accountTo == currentUser._id){
                    $set['accountTo'] = accountToReAssigned;
                }
                Transactions.update(transaction._id, {$set: $set});
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