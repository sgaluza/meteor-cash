Template.accountsModalDelete.helpers({
    deleteAccount: function () {
        return Accounts.findOne({_id: Iron.controller().getParams().hash});
    },
    accountsWithSameCurrency: function () {
        var currentUser = Accounts.findOne({_id: Iron.controller().getParams().hash});
        var users = _.filter(Accounts.find().fetch(), {'currencyId': currentUser.currencyId});
        var currentUserIndex = _.findIndex(users, function(user) {
            return user._id === currentUser._id;
        });
        users.splice(currentUserIndex, 1);
        return _.map(users, function (user) {
            return {
                label: user.name,
                value: user._id
            }
        });
    }
});

Template.accountsModalDelete.events({
    'submit form': function () {
        var accountToReAssigned = AutoForm.getFieldValue('names', 'deleteAccount');
        var currentUser = Accounts.findOne({_id: Iron.controller().getParams().hash});
        var userTransactions = _.filter(Transactions.find().fetch(), {'account' : currentUser._id});

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
        Router.go('accounts');
    }
});