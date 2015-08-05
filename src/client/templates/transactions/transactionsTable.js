Template.transactionsTable.helpers({
    transactionRows: function () {
        return Transactions.find();
    },
    transactionRowsSettings: function () {
        return {
            showFilter: false,
            fields: [
                {
                    key: '_id',
                    label: 'ID',
                    headerClass: function () {
                        return 'hidden'
                    },
                    cellClass: function () {
                        return 'hidden';
                    }
                },
                {
                    key: 'date',
                    label: 'Date',
                    fn: function (value) {
                        var date = new Date(value);
                        return date.toDateString();
                    }
                },
                {
                    key: 'amount',
                    label: 'Amount'
                },
                {
                    key: 'categoryId',
                    label: 'Category',
                    fn: function (value) {
                        var doc = Categories.findOne(value);
                        return doc ? doc.title : '';
                    }
                },
                {
                    key: 'partyId',
                    label: 'Payer'
                },
                {
                    key: 'accountId',
                    label: 'Account',
                    fn: function (value) {
                        var doc = Accounts.findOne(value);
                        return doc ? doc.title : '';
                    }
                },
                {
                    key: 'notes',
                    label: 'Notes',
                    fn: function (value) {
                        var innerHtml = value
                            ? '<i class="fa fa-info-circle"></i>'
                            : '<i class="fa fa-info-circle" style="opacity: 0.4"></i>'

                        return new Spacebars.SafeString(innerHtml);
                    }
                }
            ]
        }
    }
});

Template.transactionsTable.events({
    'click .reactive-table tbody tr': function (event) {
        Session.set('transactionTableSelectedId', $(event.currentTarget).find('.hidden').text());
        Session.set('transactionsPanelTemplate', 'transactionsPanelUpdate');
    }
});