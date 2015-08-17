Template.transactionsPanelFooter.helpers({
    removeButtonOn: function () {
        return Session.get('transactions_panelTemplate') === 'transactionsPanelYieldUpdate';
    },
    categoriesTagsList: function () {
        return Session.get('transactions_categoriesTags');
    }
});

Template.transactionsPanelFooter.events({
    'click #saveTransactionButton': function () {
        Router.go('transactions')
    },
    'click #cancelTransactionButton': function (event) {
        event.preventDefault();

        Session.set('transactions_categoriesTags', []);
    },
    'click #removeTransactionButton': function () {
        Transactions.remove({_id: Session.get('transactions_selectedRow')});

        Session.set('transactions_selectedRow', '');
        Session.set('transactions_panelTemplate', '');
        Session.set('transactions_categoriesTags', []);
    },
    'click a': function (event) {
        event.preventDefault();

        var rejectedTags = _.reject(Session.get('transactions_categoriesTags'), {tagId: event.currentTarget.id})
        Session.set('transactions_categoriesTags', rejectedTags);
    }
});