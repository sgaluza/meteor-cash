Template.categories.onRendered(function () {
    $('#categoriesTree').treeview({
        data: Template.categories.getTree(),
        onNodeSelected: function (event, data) {
            Session.set('categories_updatedId', data._id);
            $('#categoriesModalUpdate').modal();
        },
        selectedColor: '#000000',
        selectedBackColor: '#FFFFFF'
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
            text: doc.title
        });

        if (doc.parentId) {
            parentCategory = _.find(categories, {_id: doc.parentId});

            if (parentCategory) {
                if (parentCategory.nodes) {
                    parentCategory.nodes.push(doc);
                } else {
                    parentCategory.nodes = [doc];
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
        $('#categoriesModalCreate').modal();
    },
    'submit form': function () {
        Session.set('categories_tree', Template.categories.getTree());
    }
});

Deps.autorun(function () {
    $('#categoriesTree').treeview({
        data: Session.get('categories_tree'),
        onNodeSelected: function (event, data) {
            Session.set('categories_updatedId', data._id);
            $('#categoriesModalUpdate').modal();
        },
        selectedColor: '#000000',
        selectedBackColor: '#FFFFFF'
    });
});