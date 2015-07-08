Categories = utils.schemaCollection('Cateogories', {
    title: {
        type: String,
        label: 'Category',
        max: 200,
        index: true,
        unique: true
    },
    parentId: {
        type: Meteor.ObjectId,
        label: "Parent Category",
        optional: true,
        autoform: {
            firstOption: "(Select Parent Category)",
            selectOnBlur: true,
            type: "select",
            options: function() {
                return Categories.find().map(function(v){
                    return {
                        label: v.title,
                        value: v._id
                    }
                });
            }
        }
    },

});