Template.categoriesModalUpdate.helpers({
    updatedDoc: function () {
        return Categories.findOne({_id: Iron.controller().getParams().hash});
    }
});