Template.transactionsTable.created = function () {
    this.filter = new ReactiveTable.Filter('transactionsTable', ['_date', '_category', '_transactions', '_account']);
};

function getTransactionsRows () {
    return Transactions.find();
}

Template.transactionsTable.helpers({
    transactionRows: function () {
        return getTransactionsRows();
    },
    transactionRowsSettings: function () {
        return {
            showFilter: false,
            filters: {
                fields: ['_date', '_category', '_transactions', '_account'],
                filters: ['transactionsFilter']
            },
            fields: [
                {
                    key: '_id',
                    label: '',
                    sortable: false,
                    headerClass: 'hidden',
                    cellClass: 'hidden'
                },
                {
                    key: '_date',
                    label: '',
                    sortable: false,
                    //sortOrder: 1,
                    //sortDirection: 'descending',
                    sortByValue: true,
                    tmpl: Template.transactionsTableDate,
                    fn: function (value, object) {
                        console.log(value, object);
                        return value;
                    }
                },
                {
                    key: '_category',
                    label: '',
                    sortable: false,
                    tmpl: Template.transactionsTableCategory
                },
                {
                    key: '_transaction',
                    label: '',
                    sortable: false,
                    tmpl: Template.transactionsTableTransaction
                },
                {
                    key: '_account',
                    label: '',
                    sortable: false,
                    tmpl: Template.transactionsTableAccount
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
    },
    'keyup .transactions-filter, input .transactions-filter-input': function (event, template) {
        var input = $(event.target).val();
        var transactionsCursor = getTransactionsRows();
        var transactions = transactionsCursor.fetch().length ? transactionsCursor.fetch() : [];
    }
});

Template.transactionsTableDate.helpers({
    date: function () {
        var mdate = moment(this.date);

        return {
            dayOfMonth: mdate.format('MMMM D'),
            dayOfWeek: mdate.format('dddd')
        }
    }
});

Template.transactionsTableCategory.helpers({
    category: function () {
        var category = Categories.findOne(this.categories) || {title: 'No category'},
            payer = this.payer ? ' — ' + this.payer : '',
            recipient = this.recipient ? ' — ' + this.recipient : '',
            notes = this.notes ? this.notes : '';

        return {
            name: category.title,
            payer: payer,
            recipient: recipient,
            notes: notes
        };
    }
});

Template.transactionsTableTransaction.helpers({
    transaction: function () {
        var account = Accounts.findOne(this.account, {fields: {currencyId: 1}});
        var currency = account ? Currencies.findOne({code: account.currencyId}) : {symbol: ''};

        return {
            amount: this.amount || '',
            amountTo: this.amountTo ? ' → ' + this.amountTo : '',
            currency: currency.symbol
        };
    }
});

Template.transactionsTableAccount.helpers({
    account: function () {
        var accounts = Accounts.find({_id: {$in: [this.account, this.accountTo]}}).fetch();

        return {
            name: accounts.length > 0 ? accounts[0].name : '',
            to: accounts.length > 1 ? ' → ' + accounts[1].name : ''
        }
    }
});