Transactions = utils.schemaCollection('Transactions', {
    date: {
        type: Date,
        label: "Date"
    },
    accountId: {
        type: Meteor.ObjectId,
        optional:true,
        autoform: {
            firstOption: 'Select an account',
            selectOnBlur: true,
            type: 'select',
            options: function () {
                return _.map(Accounts.find().fetch(), function (item) {
                    return {
                        label: item.title,
                        value: item._id
                    }
                });
            }
        }
    },
    accountTo: {
        type: Meteor.ObjectId,
        optional: true
    },
    amount: {
        type: Number,
        decimal: true
    },
    amountTo : {
        type: Number,
        decimal: true,
        optional: true
    },
    categoryId: {
        type: Meteor.ObjectId,
        optional: true,
        autoform: {
            firstOption: 'Select a category',
            selectOnBlur: true,
            type: 'select',
            options: function () {
                return _.map(Categories.find().fetch(), function (item) {
                    return {
                        label: item.title,
                        value: item._id
                    }
                });
            }
        }
    },
    partyId: {
        type: Meteor.ObjectId,
        optional: true
    },
    tagIds: {
        type: [Meteor.ObjectId],
        optional: true
    },
    notes: {
        type: String,
        optional: true
    }
});