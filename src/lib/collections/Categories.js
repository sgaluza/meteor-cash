Categories = utils.schemaCollection('Categories', {
    title: {
        type: String,
        label: 'Category',
        max: 200,
        autoform: {
            placeholder: "Name your account"
        },
        index: true,
        unique: true
    },
    parentId: {
        type: Meteor.ObjectId,
        label: "Parent Category",
        optional: true,
        autoform: {
            firstOption: "Select Parent Category",
            selectOnBlur: true,
            type: "select",
            options: function() {
                var categories = Categories.find().fetch();
                _.each(categories, function(v){
                    if(v.parentId){
                        var parent =  _.find(categories, function(c){
                            return c._id == v.parentId;
                        });
                        if(!parent.children) parent.children = [];
                        parent.children.push(v);
                    }
                });

                var items = [];
                var addItem = function(category, level){
                    items.push({
                        label: _.repeat('\u2022', level) + ' ' + category.title,
                        value: category._id
                    });
                    if(category.children) {
                        _(category.children)
                            .sortBy('title')
                            .each(function(c){
                                addItem(c, level+1)
                            });
                    }
                };

                _(categories)
                    .filter(function(v){
                        return !v.parentId
                    })
                    .sortBy('title')
                    .each(function(v){
                        addItem(v, 0);
                    });
                return items;
            }
        }
    },
    order: {
        type: Number,
        optional: true
    }
});