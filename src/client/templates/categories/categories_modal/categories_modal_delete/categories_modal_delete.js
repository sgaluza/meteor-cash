Template.categoriesModalDelete.helpers({
    deleteCategory: function () {
        return Categories.findOne({_id: Iron.controller().getParams().hash});
    }
});

Template.categoriesModalDelete.events({
    'click #categoriesModalDelete .delete': function () {
        var newCategoryForTransactions = AutoForm.getFieldValue('parentId', 'deleteCategory'),
            transactions = _.filter(Transactions.find().fetch(), {'categories' : Iron.controller().getParams().hash}),
            category = Categories.findOne({'_id' : Iron.controller().getParams().hash}),
            childCategories = _.filter(Categories.find().fetch(), {'parentId' : Iron.controller().getParams().hash});

        if (childCategories.length > 0) {
            alertify.alert('This category has subcategories. You need to delete subcategories before delete main category.');
            AutoForm.resetForm('deleteCategory');
            return;
        }
        if (newCategoryForTransactions && transactions && childCategories.length == 0) {
            _.forEach(transactions, function(transaction){
                Transactions.update(transaction._id, {$set: {'categories' : newCategoryForTransactions}});
            });
        } else if (transactions){
            _.forEach(transactions, function(transaction){
                Transactions.update(transaction._id, {$set: {'categories' : ''}});
            });
        }
        Categories.remove({_id: Iron.controller().getParams().hash});
        $('#categoriesModalDelete').modal('hide');
        alertify.log('Category <strong>' + category.title + '</strong> was deleted');
        Router.go('categories');
    }
});