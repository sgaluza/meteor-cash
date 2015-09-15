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
            type: 'select',
            firstOption: 'Select a category',
            selectOnBlur: true,
            options: function () {
                return _.map(Categories.find().fetch(), function (item) {
                    return {
                        value: item._id,
                        label: item.title
                    }
                });
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