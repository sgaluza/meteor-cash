//OldTransactions = utils.schemaCollection('Transactions', {
//    date: {
//        type: Date,
//        label: "Date"
//    },
//    accountId: {
//        type: Meteor.ObjectId,
//        optional:true,
//        autoform: {
//            firstOption: 'Select an account',
//            selectOnBlur: true,
//            type: 'select',
//            options: function () {
//                return _.map(Accounts.find().fetch(), function (item) {
//                    return {
//                        label: item.title,
//                        value: item._id
//                    }
//                });
//            }
//        }
//    },
//    accountTo: {
//        type: Meteor.ObjectId,
//        optional: true
//    },
//    amount: {
//        type: Number,
//        decimal: true
//    },
//    amountTo : {
//        type: Number,
//        decimal: true,
//        optional: true
//    },
//    categoryId: {
//        type: Meteor.ObjectId,
//        optional: true,
//        autoform: {
//            firstOption: 'Select a category',
//            selectOnBlur: true,
//            type: 'select',
//            options: function () {
//                return _.map(Categories.find().fetch(), function (item) {
//                    return {
//                        label: item.title,
//                        value: item._id
//                    }
//                });
//            }
//        }
//    },
//    partyId: {
//        type: Meteor.ObjectId,
//        optional: true
//    },
//    tagIds: {
//        type: [Meteor.ObjectId],
//        optional: true
//    },
//    notes: {
//        type: String,
//        optional: true
//    }
//});

Transactions = utils.schemaCollection('Transactions', {
    date: {
        type: Date
    },
    type: {
        type: Number
    },
    categories: {
        type: [Meteor.ObjectId],
        optional: true,
        autoform: {
            type: 'select',
            //afFieldInput: {
            //    multiple: true
            //},
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
                        label: item.title
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
                        label: item.title
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
    }
});