Template.registerHelper('accountsGetCategories', function () {
    return Accounts.find();
});

Template.accounts.onRendered(function () {
    Template.accounts.initTree();
});

Template.accounts.initTree = function () {
    var parentAccount,
        accounts = Accounts.find().fetch() || [];

    var getBalance = function (b) {
        return _.isNumber(b) ? String(b) : "0";
    };

    var getCurrencyById = function (c) {
        return _.find(currencies, {"cc": c})
    };

    _.forEach(accounts, function (doc) {
        var currency = getCurrencyById(doc.currencyId);

        _.assign(doc, {
            text: doc.title + ' ~ ' + getBalance(doc.balance) + '<sup> ' + currency.symbol + '</sup>&nbsp;<sub style="color: gray">' + currency.name + '</sub>'
        });

        if (doc.parentId) {
            parentAccount = _.find(accounts, {_id: doc.parentId});

            if (parentAccount) {
                if (parentAccount.nodes) {
                    parentAccount.nodes.push(doc);
                } else {
                    parentAccount.nodes = [doc];
                }
            }
        }
    });

    $('#accountsTree').treeview({
        data: _.filter(accounts, function () {
            return !accounts.parentId;
        }),
        onNodeSelected: function (event, data) {
            Session.set('docForUpdate', data._id);
            Template.accounts.callModal('accountUpdateModal', 'accountUpdate', 'Update Account');
        }
    });
};

Template.accounts.events({
    "click #createAccount": function() {
        $('#accountsModalCreate').modal();
    }
});

