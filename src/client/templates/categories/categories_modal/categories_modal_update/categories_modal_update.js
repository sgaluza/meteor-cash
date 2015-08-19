Template.categoriesModalUpdate.helpers({
    updatedDoc: function () {
        return Categories.findOne({_id: Session.get('categories_updatedId')});
    }
});

Template.categoriesModalUpdate.events({
    'submit form': function () {
        $('#categoriesModalUpdate').modal('hide');
    }
});