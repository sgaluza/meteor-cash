function getTags(tags){
    _.forEach(tags, function(t, key) {
        tags[key] = Tags.findOne({_id: t}) ? Tags.findOne({_id: t}).title : t;
    });
    return tags;
}

var options = {
    keepHistory: 0,
    localSearch: true
};
var fields = ['search'];

TransactionsSearch = new SearchSource('transactions', fields, options);

Template.searchResult.helpers({
    getTransactions: function() {
        var transactions = TransactionsSearch.getData(),
            accounts = Accounts.find().fetch(),
            categories = Categories.find().fetch(),
            category = Session.get('selectCategory'),
            daterangeStart = Session.get('daterangeStart'),
            daterangeEnd = Session.get('daterangeEnd'),
            transactionsWithCategorySort = [],
            transactionsWithDataSort = [];
        if (!TransactionsSearch.getCurrentQuery() || TransactionsSearch.getCurrentQuery() === '') {
            transactions = Transactions.find({}, {sort: {date: -1}}).fetch();
        }
        if (category) {
            _.forEach(transactions, function(transaction) {
                if (transaction.categories === category) {
                    transactionsWithCategorySort.push(transaction);
                }
            });
            _.forEach(transactionsWithCategorySort, function(transaction) {
                if (moment(transaction.date).format('X') > daterangeStart && moment(transaction.date).format('X') < daterangeEnd) {
                    transactionsWithDataSort.push(transaction);
                }
            });
        } else {
            _.forEach(transactions, function(transaction) {
                if (moment(transaction.date).format('X') > daterangeStart && moment(transaction.date).format('X') < daterangeEnd) {
                    transactionsWithDataSort.push(transaction);
                }
            });
        }

        return _.forEach(transactionsWithDataSort, function(transaction) {
            var currencyId = _.result(_.find(accounts, {'_id' : transaction.account}), 'currencyId'),
                currencyIdTo = _.result(_.find(accounts, {'_id' : transaction.accountTo}), 'currencyId')
            transaction.currencyId = currencyId;
            transaction.currency = _.result(_.find(currencies, {'code' : currencyId}), 'symbol');
            transaction.amount = accounting.formatNumber(transaction.amount, 2);
            transaction.currencyIdTo = currencyIdTo;
            transaction.currencyTo = _.result(_.find(currencies, {'code' : currencyIdTo}), 'symbol');
            transaction.amountTo = accounting.formatNumber(transaction.amountTo, 2);
            transaction.rate = '';
            if (transaction.tags) {
                transaction.tags = getTags(transaction.tags);
            }
            if (transaction.payer) {
                transaction.payer = getTags(transaction.payer);
            }
            if (transaction.categories) {
                transaction.categories = _.result(_.find(categories, {'_id' : transaction.categories}), 'title');
            }
            if (transaction.type == 2) {
                transaction.type = 'expense'
            } else if (transaction.type == 1) {
                transaction.type = 'income'
            } else {
                transaction.type = 'transfer'
            }
            transaction.account = _.result(_.find(accounts, {'_id' : transaction.account}), 'name');
            transaction.accountTo = _.result(_.find(accounts, {'_id' : transaction.accountTo}), 'name');
        });
    },
    isEqual: function(a, b){
        return a == b;
    }
});

Template.searchResult.rendered = function() {
    TransactionsSearch.search('');
};

Template.searchBox.events({
    "keyup #search-box": _.throttle(function(e) {
        var text = $(e.target).val().trim();
        TransactionsSearch.search(text);
    }, 200)
});

Template.transactionsTable.helpers({
    selectCategories: function () {
        return Categories.find().fetch();
    }
});
Template.transactionsTable.events({
    'click .transactions-date a[name="latest"]' : function () {
        $('.period').fadeOut();
        $('a[name="period"]').removeClass('active');
        $('a[name="latest"]').addClass('active');
        Session.set('daterangeStart', moment().subtract(3, "months").format("X"));
        Session.set('daterangeEnd', moment().add(1, "days").format("X"));
        $('input[type="rangeslide"]').data("ionRangeSlider").reset();
    },
    'click .transactions-date a[name="period"]' : function () {
        $('.period').fadeIn();
        $('a[name="period"]').addClass('active');
        $('a[name="latest"]').removeClass('active');
    },
    'focus .transactions-filter-input' : function () {
        $('.transactions-filter-input').attr('placeholder', '');
    },
    'blur .transactions-filter-input' : function () {
        $('.transactions-filter-input').attr('placeholder', 'Click to search by name and etc');
    },
    'change #select-filter': function() {
        if ($('#select-filter option:selected').text() == 'Select a category') {
            Session.set('selectCategory', '');
        } else {
            var selectCategory = $('#select-filter option:selected').val();
            Session.set('selectCategory', selectCategory);
        }
    },
    'click .transactions-table-inner tr.transaction' : function (event) {
        var selectedRowId = event.currentTarget.classList[1];
        var transaction = Transactions.findOne(selectedRowId);
        Session.set('transactions_accountId', transaction.account);
        if (transaction.accountTo) Session.set('transactions_accountToId', transaction.accountTo);

        Router.go('transactions.update', {
            type: TransactionsTypes[transaction.type],
            id  : transaction._id
        });
    }
});

Template.transactionsTable.rendered = function() {
    $('.transactions-table-inner').mCustomScrollbar({
        theme: 'minimal-dark'
    });
    Session.setDefault('selectCategory', '');
    Session.setDefault('daterangeStart', moment().subtract(3, "months").format("X"));
    Session.setDefault('daterangeEnd', moment().add(1, "days").format("X"));
    $('input[type="rangeslide"]').ionRangeSlider({
        type: "double",
        min: +moment().subtract(1, "years").format("X"),
        max: +moment().add(1, 'years').format("X"),
        from: +moment().subtract(3, "months").format("X"),
        to: +moment().format("X"),
        step: 24,
        grid: true,
        hide_min_max: true,
        hide_from_to: true,
        force_edges: true,
        prettify: function (num) {
            var m = moment(num, "X");
            return m.format("LL");
        },
        onChange: function (data) {
            Session.set('daterangeStart', data.from);
            Session.set('daterangeEnd', data.to);
            $('.from-to-period span').html(moment(data.from, "X").format("LL") + ' &mdash; ' + moment(data.to, "X").format("LL"));
        }
    });
};

Template.transactionsTable.created = function(){
    var self = this;
    self.rates = this.view.parentView.templateInstance().rates;
};

Template.transactionsTable.onDestroyed(function () {
    Session.set('selectCategory', '');
    Session.set('daterangeStart', moment().subtract(3, "months").format("X"));
    Session.set('daterangeEnd', moment().add(1, "days").format("X"));
});
