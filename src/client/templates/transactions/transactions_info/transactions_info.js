Template.transactionsInfo.helpers({
    allMoney: function () {
        return _.reduce(_.map(Transactions.find().fetch(), function (doc) {
                return doc.amount;
        }), function (memo, num) {
            return memo + num;
        });
    },
    currency: function () {
        return '$';
    },
    accountsList: function () {
        var accounts = Accounts.find().fetch();

        console.log(Transactions.find('mXqKCDKF4WyaeXijL').fetch());

        return _.map(accounts, function(doc) {
            return _.assign(doc, {
                balance: _.reduce(_.map(Transactions.find({account: doc._id}).fetch(), function (subdoc) {
                    return subdoc.amount;
                }), function (memo, num) {
                    return memo + num;
                }) || '0'
            })
        });
    }
});