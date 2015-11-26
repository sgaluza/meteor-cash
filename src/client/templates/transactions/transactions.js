Session.set('transactions_panelTemplate', '');
Session.set('transactions_selectedRow', '');
Session.set('transactions_categoriesTags', []);

var assignSearchToDoc = function(doc) {
    var search = getSearchArray(doc);
    return search.length ?_.assign(doc, {search: search}) : doc;
};

var getSearchArray = function(doc) {
    return _.compact([
        _.result(Categories.findOne(doc.categories), 'title'),
        _.result(Accounts.findOne(doc.account), 'name'),
        //doc.payer,
        doc.notes
    ]);
};

AutoForm.hooks({
    insertTransaction: {
        formToDoc: function (doc) {
            return assignSearchToDoc(doc);
        }
    },
    updateTransaction: {
        formToModifier: function (modifier) {
            delete modifier['$unset'].amount;
            _.assign(modifier['$set'], getSearchArray(modifier['$set']));
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