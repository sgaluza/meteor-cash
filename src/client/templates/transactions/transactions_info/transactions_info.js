Template.transactionsInfo.helpers({
    allMoney: function () {
        var exRates = Template.instance().rates.get(),
            transactions = Transactions.find().fetch(),
            rateUSD = _.result(_.find(exRates, {'abbreviation' : 'USD'}), 'rate'),
            result = {},
            summ = 0,
            temp;

        if (Accounts.find().fetch().length > 0 && exRates) {
            _.forEach(transactions, function(t) {
                var account = Accounts.findOne({_id: t.account});
                t['currencyId'] = (account) ? account.currencyId : "";
                if (t.type === 3) {
                    var accountTo = Accounts.findOne({_id: t.accountTo}),
                        transactionsTo = {
                            'currencyId' : (accountTo) ? accountTo.currencyId : "",
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
                    var rate = _.result(_.find(exRates, {'abbreviation' : t.currencyId}), 'rate');
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
                var account = Accounts.findOne({_id: t.account});
                t['currencyId'] = (account) ? account.currencyId : "";
                if (t.type === 3) {
                    var accountTo = Accounts.findOne({_id: t.accountTo}),
                        transactionsTo = {
                            'currencyId': (accountTo) ? accountTo.currencyId : "",
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
            _.forEach(result, function(sum, cur){
                var currency = _.find(currencies, {'code' : cur});
                summ.push({currencyId: currency.symbol, balance: accounting.formatNumber(sum, 2), title: currency.name + ', ' + currency.code});
            });
        }
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
