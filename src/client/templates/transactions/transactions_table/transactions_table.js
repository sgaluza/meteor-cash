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
                    sortable: false,
                    headerClass: function () {
                        return 'hidden'
                    },
                    cellClass: function () {
                        return 'hidden';
                    }
                },
                {
                    key: 'date',
                    label: '',
                    sortable: false,
                    sortByValue: true,
                    sortDirection: 'descending',
                    fn: function (value, object) {
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
                    sortable: false,
                    fn: function (empty, object) {
                        var categories = Categories.findOne(object.categories) || {title: 'No category'};

                        var payer = object.payer ? ' — ' + object.payer : '';
                        var recipient = object.recipient ? ' — ' + object.recipient : '';
                        var notes = object.notes ? object.notes : '';

                        var html = '<div class="categories-list">' + categories.title + '<span class="categories-recipient">'+ recipient + payer + '</span></div>'
                                 + '<div class="categories-notes">' + notes + '</div>';

                        return new Spacebars.SafeString(html);
                    }
                },
                {
                    key: '_transactions',
                    label: '',
                    sortable: false,
                    fn: function (empty, object) {
                        var amount = object.amount;
                        var amountTo = object.amountTo;
                        var account = Accounts.findOne(object.account, {
                            fields: {
                                currencyId: 1
                            }
                        });

                        var currency = account ? _.result(_.find(currencies, {cc: account.currencyId}), 'symbol') : '';

                        var html = '<div>' + amount + (amountTo ? ' → ' + amountTo : '') + ' <sup>' + currency + '</sup>';

                        return new Spacebars.SafeString(html);
                    }
                },
                {
                    key: '_accounts',
                    label: '',
                    sortable: false,
                    fn: function (empty, object) {
                        var account = Accounts.findOne(object.account);
                        var accountTo = Accounts.findOne(object.accountTo);

                        var html = account
                            ? '<span>' + account.name + (accountTo ? ' → ' + accountTo.name : '') + '</span>'
                            : '';

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
    }
});