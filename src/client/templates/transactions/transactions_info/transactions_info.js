Template.transactionsInfo.helpers({
    allMoney: function () {
        var exRates = Template.instance().rates.get(),
            transactions = Transactions.find().fetch(),
            rateUSD = _.result(_.findWhere(exRates, {'abbreviation' : 'USD'}), 'rate'),
            result = {},
            summ = 0,
            temp;

        if (Accounts.find().fetch().length > 0 && exRates) {
            _.forEach(transactions, function(t) {
                var currencyId = Accounts.find({_id: t.account}).fetch()[0].currencyId;
                t['currencyId'] = currencyId;
                if (t.type === 3) {
                    var currencyIdTo = Accounts.find({_id: t.accountTo}).fetch()[0].currencyId,
                        transactionsTo = {
                            'currencyId' : currencyIdTo,
                            'amount'     : t.amountTo,
                            'toAccount'  : true,
                            'type'       : 3
                        };
                    transactions.push(transactionsTo);
                }
            });

            transactions.forEach(function(t){
                if(!result.hasOwnProperty(t.currencyId)) {
                    result[t.currencyId] = 0;
                }

                if (t.currencyId === 'USD') {
                    if (t.type === 3) {
                        if(t.toAccount) {
                            summ += t.amount;
                        } else {
                            summ -= t.amount;
                        }
                    } else if (t.type === 1) {
                        summ += t.amount;
                    } else {
                        summ -= t.amount;
                    }
                } else if (t.currencyId === 'BYR') {
                    if (t.type === 3) {
                        if(t.toAccount) {
                            temp = t.amount / rateUSD;
                            summ += temp;
                        } else {
                            temp = t.amount / rateUSD;
                            summ -= temp;
                        }
                    } else if (t.type === 1) {
                        temp = t.amount / rateUSD;
                        summ += temp;
                    } else {
                        temp = t.amount / rateUSD;
                        summ -= temp;
                    }
                } else {
                    var rate = _.result(_.findWhere(exRates, {'abbreviation' : currency}), 'rate');
                    if (t.type === 3) {
                        if(t.toAccount) {
                            temp = (t.amount * rate) / rateUSD;
                            summ += temp;
                        } else {
                            temp = (t.amount * rate) / rateUSD;
                            summ -= temp;
                        }
                    } else if (t.type === 1) {
                        temp = (t.amount * rate) / rateUSD;
                        summ += temp;
                    } else {
                        temp = (t.amount * rate) / rateUSD;
                        summ -= temp;
                    }
                }

            });
        }

        return accounting.formatNumber(summ, 2);
    },
    currency: function () {
        return '$';
    },
    accountsList: function () {
        var transactions = Transactions.find().fetch(),
            result = {},
            summ = [];
        if (Accounts.find().fetch().length > 0) {
            _.forEach(transactions, function (t) {
                var currencyId = Accounts.find({_id: t.account}).fetch()[0].currencyId;
                t['currencyId'] = currencyId;
                if (t.type === 3) {
                    var currencyIdTo = Accounts.find({_id: t.accountTo}).fetch()[0].currencyId,
                        transactionsTo = {
                            'currencyId': currencyIdTo,
                            'amount': t.amountTo,
                            'toAccount': true,
                            'type': 3
                        };
                    transactions.push(transactionsTo);
                }
            });

            transactions.forEach(function (t) {
                if (!result.hasOwnProperty(t.currencyId)) {
                    result[t.currencyId] = 0;
                }
                if (t.type === 3) {
                    if (t.toAccount) {
                        result[t.currencyId] += t.amount;
                    } else {
                        result[t.currencyId] -= t.amount;
                    }
                } else if (t.type === 1) {
                    result[t.currencyId] += t.amount;
                } else {
                    result[t.currencyId] -= t.amount;
                }

            });

            for (var key in result) {
                summ.push({currencyId: key, balance: accounting.formatNumber(result[key], 2)});
            }
        }
        return summ;
    },
    accounts: function () {
        var accounts = Accounts.find().fetch();

        return _.forEach(accounts, function(account) {
            account.balance = accounting.formatNumber(account.balance, 2);
        });
    }
});

Template.transactionsInfo.created = function (){
    var self = this;
    self.rates = new ReactiveVar();

    HTTP.post('http://localhost:8888', {data: {date: moment().format('YYYY-MM-DD')}}, function(error, result){

        self.rates.set(result.data);
    });
};