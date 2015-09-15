Template.categories.helpers({
    categories: function () {
        return Categories.find().fetch();
    }
});

Template.categories.events({
    'click #createCategory': function () {
        AutoForm.resetForm('insertCategory');
        $('#categoriesModalCreate').modal();
    },
    'click a.category-edit': function () {
        AutoForm.resetForm('updateCategory');
        $('#categoriesModalUpdate').modal();
    },
    'mouseenter li.category-item': function (event) {
        $(event.currentTarget).find('div.pull-right').show();
    },
    'mouseleave li.category-item': function (event) {
        $(event.currentTarget).find('div.pull-right').hide();
    }
});