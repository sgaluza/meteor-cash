Meteor.methods({
    exportAllTransactions: function() {
        var fields = [
            "Id",
            "Type",
            "Date",
            "Amount",
            "Categories",
            "Account",
            "AmountTo",
            "AccountTo",
            "Tags",
            "Notes"
        ];

        var data = [];

        var transactions = Transactions.find().fetch();
        function getTypeName(typeId) {
            if (typeId == 1) {
                return 'Expense'
            } else if (typeId == 2) {
                return 'Income'
            } else {
                return 'Transfer'
            }
        }
        _.each(transactions, function(t) {
            data.push([
                t._id,
                getTypeName(t.type),
                moment.utc(t.date).format("DD/MM/YYYY"),
                t.amount,
                _.result(_.find(Categories.find().fetch(), {'_id' : t.categories}), 'title') || '',
                _.result(_.find(Accounts.find().fetch(), {'_id' : t.account}), 'name'),
                t.amountTo || '',
                _.result(_.find(Accounts.find().fetch(), {'_id' : t.accountTo}), 'name') || '',
                t.tags || '',
                t.notes || ''
            ]);
        });

        return {fields: fields, data: data};
    }
});