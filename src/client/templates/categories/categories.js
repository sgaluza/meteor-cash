Template.categories.onRendered(function () {
    $('#categoriesTree').tree({
        data: Template.categories.getTree(),
        closedIcon: '<span class="glyphicon glyphicon-plus">',
        openedIcon: '<span class="glyphicon glyphicon-minus">',
        autoOpen: true,
        selectable: false,
        useContextMenu: false,
        onCreateLi: function(node, $li) {
            $li.find('.jqtree-element').append('<a href="/categories/#'+ node._id +'" class="category-delete pull-right margin-left-5" hidden="true">Delete</a><a href="/categories/#'+ node._id +'" class="category-edit pull-right" hidden="true">Edit</a>');
        }
    });
});

Template.categories.getTree = function () {
    var parentCategory;
    var categories = Categories.find().fetch();

    if (!categories) {
        return [];
    }

    _.forEach(categories, function (doc) {
        _.assign(doc, {
            label: doc.title
        });

        if (doc.parentId) {
            parentCategory = _.find(categories, {_id: doc.parentId});

            if (parentCategory) {
                if (parentCategory.children) {
                    parentCategory.children.push(doc);
                } else {
                    parentCategory.children = [doc];
                }
            }
        }
    });

    return _.filter(categories, function (category) {
        return !category.parentId;
    });
};

Template.categories.events({
    'click #createCategory': function () {
        AutoForm.resetForm('insertCategory');
        $('#categoriesModalCreate').modal();
    },
    'click a.category-edit': function () {
        AutoForm.resetForm('updateCategory');
        $('#categoriesModalUpdate').modal();
    },
    'click a.category-delete': function () {
        AutoForm.resetForm('deleteCategory');
        $('#categoriesModalDelete').modal();
    },
    'mouseenter div.jqtree-element': function (event) {
        $(event.currentTarget).find('a.category-edit').show();
        $(event.currentTarget).find('a.category-delete').show();
    },
    'mouseleave div.jqtree-element': function (event) {
        $(event.currentTarget).find('a.category-edit').hide();
        $(event.currentTarget).find('a.category-delete').hide();
    }
});

Deps.autorun(function () {
    $('#categoriesTree').tree({
        data: Template.categories.getTree(),
        closedIcon: '<span class="glyphicon glyphicon-plus">',
        openedIcon: '<span class="glyphicon glyphicon-minus">',
        autoOpen: true,
        selectable: false,
        useContextMenu: false,
        onCreateLi: function(node, $li) {
            $li.find('.jqtree-element').append('<a href="/categories/#'+ node._id +'" class="category-delete pull-right margin-left-5" hidden="true">Delete</a><a href="/categories/#'+ node._id +'" class="category-edit pull-right" hidden="true">Edit</a>');
        }
    });
});