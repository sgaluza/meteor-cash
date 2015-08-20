Template.accounts.onRendered(function () {
    $('#accountsTree').treeview({
        data: Template.accounts.getTree(),
        onNodeSelected: function (event, data) {
            Session.set('accounts_updatedId', data._id);
            $('#accountsModalUpdate').modal();
        }
    });
});

Template.accounts.getTree = function () {
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
            text: doc.title + ' ~ ' + getBalance(doc.balance) + '<sup> ' + currency.symbol + '</sup>&nbsp;<div class="pull-right" style="color: gray"><i>' + currency.name + '</i></div>'
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

    return _.filter(accounts, function (account) {
        return !account.parentId;
    });
};

Template.accounts.events({
    'click #createAccount': function () {
        $('#accountsModalCreate').modal();
    },
    'submit form': function () {
        Session.set('accounts_treeView', Template.accounts.getTree());
    }
});

Deps.autorun(function () {
    $('#accountsTree').treeview({
        data: Session.get('accounts_treeView'),
        onNodeSelected: function (event, data) {
            Session.set('accounts_updatedId', data._id);
            $('#accountsModalUpdate').modal();
        }
    });
});

