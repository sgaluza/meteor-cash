Session.set('transactions_panelTemplate', '');
Session.set('transactions_selectedRow', '');
Session.set('transactions_categoriesTags', []);

AutoForm.hooks({
    insertTransaction: {
        formToDoc: function (doc) {
            var categoriesToSave = _.map(Session.get('transactions_categoriesTags'), function (item) {
                return item.tagId;
            });

            Session.set('transactions_categoriesTags', []);

            _.assign(doc, {
                categories: categoriesToSave
            });

            return doc;
        }
    },
    updateTransaction: {
        formToModifier: function (modifier) {
            var categoriesToSave = _.map(Session.get('transactions_categoriesTags'), function (item) {
                return item.tagId;
            });

            Session.set('transactions_categoriesTags', []);

            _.assign(modifier.$set, {
                categories: categoriesToSave
            });

            delete modifier.$unset;

            return modifier;
        }
    }
});

Template.registerHelper('transactionsGetSelectedRowId', function () {
    return Transactions.findOne({_id: Router.current().params.id});
});

Template.registerHelper('currentDate', function () {
    return new Date;
});