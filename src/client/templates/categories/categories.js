var iterateTree = function(collection){
    _.forEach(collection, function(element, index){
        Categories.update({"_id" : element._id},{$set : {"order": index}})
        if(element.children && element.children.length > 0){
            iterateTree(element.children);
        }
    });
};

var sortTree = function(collection) {
    _.forEach(collection, function(element, index){
        if (element.children && element.children.length > 0) {
            element.children = _.sortBy(element.children, 'order');
            sortTree(element.children);
        }
    })
}

Template.categories.onRendered(function () {
    $('#categoriesTree').tree({
        data: Template.categories.getTree(),
        closedIcon: '<span class="glyphicon glyphicon-plus">',
        openedIcon: '<span class="glyphicon glyphicon-minus">',
        autoOpen: true,
        selectable: false,
        useContextMenu: false,
        dragAndDrop: true,
        onCreateLi: function(node, $li) {
            $li.find('.jqtree-element').append('<a href="/categories/#'+ node._id +'" class="category-delete pull-right margin-left-5" hidden="true">Delete</a><a href="/categories/#'+ node._id +'" class="category-edit pull-right" hidden="true">Edit</a>');
        }
    });

    $('#categoriesTree').bind(
        'tree.move',
        function(event) {
            if(event.move_info.position == "inside") {
                Categories.update({"_id": event.move_info.moved_node._id}, {$set: {"parentId": event.move_info.target_node._id}});
            }
            else{
                if (event.move_info.target_node.parentId) Categories.update({"_id": event.move_info.moved_node._id}, {$set: {"parentId": event.move_info.target_node.parentId}})
                else Categories.update({"_id": event.move_info.moved_node._id}, {$unset: {"parentId": ""}});
            }
            event.preventDefault();
            event.move_info.do_move();
            var tree = JSON.parse($(this).tree('toJson'));
            iterateTree(tree);
        }
    );
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
    var result = _.filter(categories, function (category) {
        return !category.parentId;
    });
    result = _.sortBy(result, 'order');
    sortTree(result);
    return result;
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