var addCategoriesTag = function (id, name) {
    var currentCategories = Session.get('transactions_categoriesTags');

    if (!_.find(currentCategories, {tagId: id})) {
        currentCategories.push({tagId: id, tagName: name});
        Session.set('transactions_categoriesTags', currentCategories);
    }
};

Template.transactionsPanelYield.events({
   'change select[name=categories]': function (event) {
       var tagId = $(event.target).val();
       var tagName = $(event.target).find("[value=" + tagId + "]").text();

       addCategoriesTag(tagId, tagName);
   },
   'change select[name=account]': function () {
       var accountToId = $('select[name=account]').val();
       Session.set('transactions_accountToId', accountToId);
   }
});

Template.transactionsPanelYieldUpdate.events({
    'change select[name="categories"]': function (event) {
        var tagId = $(event.target).val();
        var tagName = $(event.target).find("[value=" + tagId + "]").text();

        addCategoriesTag(tagId, tagName);
    }
});

Template.transactionsPanelYieldUpdate.helpers({
    payerOn: function () {
        return _.has(Transactions.findOne({_id: Router.current().params.id}), 'payer');
    },
    notesOn: function () {
        return _.has(Transactions.findOne({_id: Router.current().params.id}), 'notes');;
    }
});