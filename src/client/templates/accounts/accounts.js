Template.accountCreateModal.helpers({
    categories: function(){
        return Accounts.find();
    }
});

Template.accountUpdateModal.helpers({
    categories: function(){
        return Accounts.find();
    }
});

Template.accountCreateModal.onRendered(function(){
    $('input[name=title]').focus();
});

Template.accountUpdateModal.onRendered(function(){
    $('input[name=title]').focus();
});

Template.accounts.onRendered(function () {
    Template.accounts.initTree();
});

Template.accountUpdateModal.helpers({
    docForUpdate: function () {
        return Accounts.findOne({_id: Session.get('docForUpdate')});
    }
});

Template.accounts.callModal = function (templateName, formId, title) {
    if (!templateName || !formId) return;

    Bootstrap3boilerplate.Modal.dynamicTemplate.set(templateName);
    Bootstrap3boilerplate.Modal.formId.set(formId);
    Bootstrap3boilerplate.Modal.title.set(title);
    Bootstrap3boilerplate.Modal.show();

    $('input[name=title]').focus();
};

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
            text: doc.title + " &rarr; " + getBalance(doc.balance) + " " + currency.symbol + " (" + currency.name + ")"
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
    "click #addAccount": function() {
        Template.accounts.callModal('accountCreateModal', 'accountCreate', 'Create Account');
    }
});

