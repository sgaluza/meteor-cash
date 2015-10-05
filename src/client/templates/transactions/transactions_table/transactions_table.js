Template.transactionsTable.created = function () {
    this.filter = new ReactiveTable.Filter('transactions-filter', ['_id']);
};

function getTransactionsRows() {
    return Transactions.find();
}

function getTags(tags){
    _.forEach(tags, function(t, key) {
        tags[key] = Tags.findOne({_id: t}) ? Tags.findOne({_id: t}).title : t;
    });
    return tags;
}

Template.transactionsTable.helpers({
    transactionRows: function () {
        return getTransactionsRows();
    },
    transactionRowsSettings: function () {
        return {
            showFilter: false,
            filters   : ['transactions-filter'],
            fields    : [
                {
                    key        : '_id',
                    label      : '',
                    sortable   : false,
                    headerClass: 'hidden',
                    cellClass  : 'hidden'
                },
                {
                    key        : '_date',
                    label      : 'Date',
                    sortOrder: 1,
                    sortDirection: 'descending',
                    headerClass: 'hidden',
                    tmpl: Template.transactionsTableDate,
                    fn: function (value, object) {
                        return new Date(object.date).getTime();
                    }
                },
                {
                    key     : '_category',
                    label   : '',
                    sortable: false,
                    tmpl    : Template.transactionsTableCategory
                },
                {
                    key     : '_transaction',
                    label   : '',
                    sortable: false,
                    tmpl    : Template.transactionsTableTransaction
                },
                {
                    key     : '_account',
                    label   : '',
                    sortable: false,
                    tmpl    : Template.transactionsTableAccount
                }
            ]
        }
    }
});

Template.transactionsTable.events({
    'click .reactive-table tbody tr' : function (event) {
        var selectedRowId = $(event.currentTarget).find('.hidden').text();
        var transaction = Transactions.findOne(selectedRowId);
        Session.set('transactions_accountId', transaction.account);
        if (transaction.accountTo) Session.set('transactions_accountToId', transaction.accountTo);

        Router.go('transactions.update', {
            type: TransactionsTypes[transaction.type],
            id  : transaction._id
        });
    },
    'keyup .transactions-filter, input .transactions-filter-input': function (event, template) {
        var input = $(event.target).val();

        if (input) {
            var compared = _.map(Transactions.find({search: {$regex: input, $options: 'i'}}).fetch(), function (item) {
                return item._id;
            });

            template.filter.set({$in: compared});
        } else {
            template.filter.set('');
        }
    }
});

Template.transactionsTableDate.helpers({
    date: function () {
        return new Date(this.date).getTime() / 1000;
    }
});

Template.transactionsTableHumanDate.helpers({
    humanDate: function () {
        var mdate = moment.unix(this);

        return {
            dayOfMonth: mdate.format('MMMM D'),
            dayOfWeek : mdate.format('dddd')
        }
    }
});

Template.transactionsTableCategory.helpers({
    category: function () {
        var category = Categories.findOne(this.categories) || {title: 'No category'},
            payer = this.payer ? ' — ' + getTags(this.payer) : '',
            recipient = this.recipient ? ' — ' + getTags(this.recipient) : '',
            notes = this.notes ? this.notes : '';

        return {
            name     : (this.type == 3) ? '' : category.title,
            payer    : payer,
            recipient: recipient,
            notes    : notes
        };
    }
});

Template.transactionsTableTransaction.helpers({
    transaction: function () {
        var account = Accounts.findOne(this.account, {fields: {currencyId: 1}}),
            accountTo = Accounts.findOne(this.accountTo, {fields: {currencyId: 1}}),
            currency = account ? _.find(currencies, function(c) {return c.code == account.currencyId}) : {symbol: ''},
            currencyTo = accountTo ? _.find(currencies, function(c) {return c.code == accountTo.currencyId}) : {symbol: ''};

        return {
            amount  : accounting.formatNumber(this.amount, 2) || '',
            amountTo: this.amountTo ? ' → ' + accounting.formatNumber(this.amountTo, 2) : '',
            currency: currency.symbol,
            currencyTo: currencyTo.symbol
        };
    }
});

Template.transactionsTableAccount.helpers({
    account: function () {
        var account = Accounts.findOne(this.account, {fields: {name: 1}}),
            accountTo = this.accountTo ? Accounts.findOne(this.accountTo, {fields: {name: 1}}) : "";

        return {
            name: account ? account.name : "",
            to  : accountTo ? ' → ' + accountTo.name : ""
        }
    }
});