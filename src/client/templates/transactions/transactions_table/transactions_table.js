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
                    label: '',
                    headerClass: function () {
                        return 'hidden'
                    },
                    cellClass: function () {
                        return 'hidden';
                    }
                },
                {
                    key: '_date',
                    label: '',
                    fn: function (empty, object) {
                        var date = moment(object.date),
                            monthDay = date.format('MMMM D'),
                            dayOfWeek = date.format('dddd');
                        var html = '<div class="date-month-day">' + monthDay + '</div>'
                                 + '<div class="date-day-of-week">' + dayOfWeek + '</div>';

                        return new Spacebars.SafeString(html);
                    }
                },
                {
                    key: '_categories',
                    label: '',
                    fn: function (empty, object) {
                        var categories = Categories.find({_id: {$in: object.categories}}).fetch() || [];
                        var categoriesMap =  categories.length ? _.map(categories, function (item) {
                            return item.title;
                        }).join(', ') : 'Without category';
                        var recipient = object.recipient ? ' — ' + object.recipient : '';
                        var notes = object.notes ? object.notes : '';

                        var html = '<div class="categories-list">' + categoriesMap + '<span class="categories-recipient">'+ recipient +'</span></div>'
                                 + '<div class="categories-notes">' + notes + '</div>';

                        return new Spacebars.SafeString(html);
                    }
                },
                {
                    key: '_transactions',
                    label: '',
                    fn: function (empty, object) {
                        var amount = object.amount;
                        var amountTo = object.amountTo;
                        var account = Accounts.findOne(object.account, {
                            fields: {
                                currencyId: 1
                            }
                        });
                        var currency = _.result(_.find(currencies, {cc: account.currencyId}), 'symbol');

                        var html = '<div>' + amount + (amountTo ? ' → ' + amountTo : '') + ' <sup>' + currency + '</sup>';

                        return new Spacebars.SafeString(html);
                    }
                },
                {
                    key: '_accounts',
                    label: '',
                    fn: function (empty, object) {
                        var account = Accounts.findOne(object.account);
                        var accountTo = Accounts.findOne(object.accountTo);

                        var html = '<div>' + account.title + (accountTo ? ' → ' + accountTo.title : '') + '</div>';

                        return new Spacebars.SafeString(html);
                    }
                }
            ]
        }
    }
});

Template.transactionsTable.events({
    'click .reactive-table tbody tr': function (event) {
        var selectedRowId = $(event.currentTarget).find('.hidden').text();
        var transaction = Transactions.findOne(selectedRowId);

        Router.go('transactions.update', {
            type: TransactionsTypes[transaction.type],
            id: transaction._id
        });



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