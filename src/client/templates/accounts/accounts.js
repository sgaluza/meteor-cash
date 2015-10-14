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

Template.accounts.events({
    'click #createAccount': function () {
        AutoForm.resetForm('insertAccount');
        $('#accountsModalCreate').modal();
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
        $(event.currentTarget).find('div.pull-right').show();
    },
    'mouseleave li.account-item': function (event) {
        $(event.currentTarget).find('div.pull-right').hide();
    }
});
