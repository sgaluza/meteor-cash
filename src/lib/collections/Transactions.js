Transactions = utils.schemaCollection('Transactions', {
    date: {
        type: Date,
        optional: true
    },
    type: {
        type: Number
    },
    categories: {
        type: Meteor.ObjectId,
        optional: true,
        autoform: {
            firstOption: 'Select a category',
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
                            })
                            .value();
                    }
                };

                _(categories)
                    .filter(function(v){
                        return !v.parentId
                    })
                    .sortBy('title')
                    .each(function(v){
                        addItem(v, 0);
                    }).value();
                return items;
            }
        }
    },
    amount: {
        type: Number
    },
    amountTo: {
        type: Number,
        optional: true
    },
    account: {
        type: Meteor.ObjectId,
        autoform: {
            type: 'select',
            firstOption: 'Select an account',
            selectOnBlur: true,
            options: function () {
                return _.map(Accounts.find().fetch(), function (item) {
                    return {
                        value: item._id,
                        label: item.name
                    }
                });
            }
        }
    },
    accountTo: {
        type: Meteor.ObjectId,
        optional: true,
        autoform: {
            type: 'select',
            firstOption: 'Select an account',
            selectOnBlur: true,
            options: function () {
                return _.map(Accounts.find().fetch(), function (item) {
                    return {
                        value: item._id,
                        label: item.name
                    }
                });
            }
        }
    },
    payer: {
        type: String,
        optional: true
    },
    recipient: {
        type: String,
        optional: true
    },
    notes: {
        type: String,
        optional: true
    },
    search: {
        type: [String],
        index: true
    }
});