var addCategoriesTag = function (id, name) {
    var currentCategories = Session.get('transactions_categoriesTags');

    if (!_.find(currentCategories, {tagId: id})) {
        currentCategories.push({tagId: id, tagName: name});
        Session.set('transactions_categoriesTags', currentCategories);
    }
};

Template.transactionsPanelExpense.events({
    'change select[name="categoryId"]': function (event) {
        var tagId = $(event.target).val();
        var tagName = $(event.target).find("[value=" + tagId + "]").text();

        addCategoriesTag(tagId, tagName);
    }
});

Template.transactionsPanelExpenseUpdate.events({
    'change select[name="categoryId"]': function (event) {
        var tagId = $(event.target).val();
        var tagName = $(event.target).find("[value=" + tagId + "]").text();

        addCategoriesTag(tagId, tagName);
    }
});