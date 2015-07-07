Transaction = utils.schemaCollection('Transactions', {
    date: {
        type: Date,
        label: "Date"
    },
    accountId: {
        type: Meteor.ObjectID
    },
    accountTo: {
        type: Meteor.ObjectID,
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
        type: Meteor.ObjectID,
        optional: true
    },
    partyId: {
        type: Meteor.ObjectID,
        optional: true
    },
    tagIds: {
        type: [Meteor.ObjectID],
        optional: true
    },
    notes: {
        type: String,
        optional: true
    }
});