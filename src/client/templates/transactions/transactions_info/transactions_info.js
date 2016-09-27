var getAccountsWithAmounts = function(){
    var transactions = Transactions.find().fetch(),
        accounts = Accounts.find().fetch(),
        result = {};
    if (accounts.length > 0) {
        var result = _.chain(accounts).groupBy('currencyId').value(),
            accounts = _.chain(accounts).keyBy('_id').mapValues('currencyId').value();
        _.forEach(result, function(value, key){
            var summ = 0;
            value.forEach(function(account){
                summ += account.balance;
            });
            result[key] = summ;
        });
        _.forEach(transactions, function (t) {
            if (t.amount) {
                result[accounts[t.account]] -= t.amount;
            }
            if (t.amountTo) {
                result[accounts[t.accountTo]] += t.amountTo;
            }
        })
    }
    return result;
};

Template.transactionsInfo.helpers({
    allMoney: function () {
        var result = getAccountsWithAmounts(),
            exRates = Template.instance().rates.get(),
            summ = 0;
        _.forEach(result, function(sum, cur){
            if (cur == 'BYN'){
                summ += sum ;
            }
            else{
                var currentRate = _.find(exRates, {'abbreviation' : cur});
                if (currentRate){
                    summ += sum*currentRate.rate/currentRate.scale;
                }
            }
        });
        if (defaultCurrency != 'BYN'){
            var currentRate = _.find(exRates, {'abbreviation' : defaultCurrency});
            if (currentRate){
                summ *= currentRate.scale/currentRate.rate;
            }
        }
        return accounting.formatNumber(summ, 2);
    },
    currency: function () {
        return _.result(_.find(currencies, {'code' : defaultCurrency}), 'symbol');
    },
    accountsList: function () {
        var summ = [],
            result = getAccountsWithAmounts();
            _.forEach(result, function(sum, cur){
                var currency = _.find(currencies, {'code' : cur});
                summ.push({currencyId: currency.symbol, balance: accounting.formatNumber(sum, 2), title: currency.name + ', ' + currency.code});
            });
        return summ;
    }
});

Template.transactionsInfo.rendered = function() {
    $('.transactions-info-body').mCustomScrollbar({
        theme: 'minimal-dark'
    });
};

Template.transactionsInfo.created = function(){
    var self = this;
    self.rates = this.view.parentView.templateInstance().rates;
};
