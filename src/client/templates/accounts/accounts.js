Template.accountTree.helpers({
    currency: function (currencyId) {
        return _.find(currencies, function(c){return c.code == currencyId});
    }
});

Template.sortableItems.helpers({
    accounts: function () {
        return Accounts.find({}, {sort: { order: 1 }});
    },
    accountsOptions: function () {
        return {
            onSort: function (event) {
                var el = event.target.children;
                _.forEach(el, function(e){
                    var index = _.findIndex(el, {id: e.id});
                    Accounts.update({_id: e.id}, {$set: {order: index*10}});
                });
            }
        }
    }
});

Template.accounts.helpers({
    accountsExists: function() {
        return Accounts.find().fetch();
    }
});
Template.accounts.events({
    'click #createAccount': function () {
        AutoForm.resetForm('insertAccount');
        $('#accountsModalCreate').modal();
    }
});

var emptyBalance = function(doc) {
    if (!doc.balance) {
        doc.balance = 0;
    }
    return doc;
};

AutoForm.hooks({
    insertAccount: {
        formToDoc: function (doc) {
            return emptyBalance(doc);
        }
    },
    updateAccount: {
        formToModifier: function (modifier) {
            if (modifier['$unset'] && modifier['$unset'].balance){
                delete modifier['$unset'].balance;
            }
            _.assign(modifier['$set'], emptyBalance(modifier['$set']));
            return modifier;
        }
    }
});

Template.accountTree.events({
    'click a.account-edit': function () {
        AutoForm.resetForm('updateAccount');
        $('#accountsModalUpdate').modal();
    },
    'click a.account-delete': function () {
        AutoForm.resetForm('deleteAccount');
        $('#accountsModalDelete').modal();
    },
    'mouseenter li.account-item': function (event) {
        $(event.currentTarget).find('.edit-delete-account').show();
    },
    'mouseleave li.account-item': function (event) {
        $(event.currentTarget).find('.edit-delete-account').hide();
    }
});
