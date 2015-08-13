var getCategories

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
                    label: '_id',
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
                    key: 'categories',
                    label: 'Categories',
                    fn: function (value) {
                        var categories = Categories.find({_id: {$in: value}}).fetch() || [];

                        return categories.length ?_.map(categories, function (item) {
                            return item.title;
                        }).join(', ') : 'Without category';
                    }
                },
                {
                    key: 'amount',
                    label: 'Amount',
                    fn: function (value) {
                        return value;
                    }

                },
                {
                    key: 'amountTo',
                    label: '',
                    fn: function (value) {
                        return value ? "-> " + value : value;
                    }

                },
                {
                    key: 'account',
                    label: 'Account',
                    fn: function (value) {
                        var doc = Accounts.findOne(value);
                        return doc ? doc.title : '';
                    }
                },
                {
                    key: 'accountTo',
                    label: '',
                    fn: function (value) {
                        var doc = Accounts.findOne(value);
                        return doc ? "->" + doc.title : '';
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
        var selectedRowId = $(event.currentTarget).find('.hidden').text();

        Session.set('transactions_selectedRow', selectedRowId);
        Session.set('transactions_panelTemplate', 'transactionsPanelYieldUpdate');

        var transaction = Transactions.findOne(selectedRowId);
        if (transaction.categories) {
            var categories = Categories.find({_id: {$in: transaction.categories}}).fetch();
            var categoriesTags =  _.map(categories, function (item) {
                return {
                    tagId: item._id,
                    tagName: item.title
                }
            });

            Session.set('transactions_categoriesTags', categoriesTags);
        }

    }
});