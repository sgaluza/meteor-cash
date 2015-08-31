Template.afInputNumber_mcExpense.helpers({
    'currencyForAmount': function () {
        var accountId = Session.get('transactions_accountId');
        var currencyCode = _.result(Accounts.findOne(accountId), 'currencyId');

        return  _.result(Currencies.findOne({code: currencyCode}), 'symbol');
    }
});

Template.afInputNumber_mcIncome.helpers({
    'currencyForAmountTo': function () {
        var accountToId = Session.get('transactions_accountToId');
        var currencyCode = _.result(Accounts.findOne(accountToId), 'currencyId');

        return _.result(Currencies.findOne({code: currencyCode}), 'symbol');
    }
});


AutoForm.hooks({
    categoryEdit: {
        onSuccess: function(){
            Template.categories.initTree();
        }
    },
    categoryUpdate: {
        onSuccess: function(){
            Template.categories.initTree();
        }
    }
});