Template.categoryEditModal.helpers({
    categories: function(){
        return Categories.find();
    }
});

Template.categoryEditModal.onRendered(function(){
    $('input[name=title]').focus();
});

Template.categoryUpdateModal.helpers({
    selectedCategoryDoc: function () {
        return Categories.findOne(Session.get("selectedCategoryId"));
    },

    isSelectedCategory: function () {
        return Session.equals("selectedCategoryId", this._id);
    },

    disableButtons: function () {
        return !Session.get("selectedCategoryId");
    }
});

Template.categoryUpdateModal.events({
    'click .node-tree': function () {
        Session.set("selectedCategoryId", this._id);
    }
});

Template.categories.initTree = function () {
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

    var categoriesTree = $('#tree').treeview({
        data: _.filter(categories, function (doc) {
            return !doc.parentId;
        }),
        levels: 5,
        onNodeSelected: function (event, data) {
            //Bootstrap3boilerplate.Modal.dynamicTemplate.set("categoryUpdateModal");
            //Bootstrap3boilerplate.Modal.formId.set("categoryUpdate");
            //Bootstrap3boilerplate.Modal.title.set("Update Category");
            //Bootstrap3boilerplate.Modal.show();
            //$('input[name=title]').focus();
        }
    });
};

Template.categories.onRendered(function () {
    Template.categories.initTree();
});

Template.categories.events({
    "click #add-category": function() {
        Bootstrap3boilerplate.Modal.dynamicTemplate.set("categoryEditModal");
        Bootstrap3boilerplate.Modal.formId.set("categoryEdit");
        Bootstrap3boilerplate.Modal.title.set("Add Category");
        Bootstrap3boilerplate.Modal.show();
        $('input[name=title]').focus();
    }
});