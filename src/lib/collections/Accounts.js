Accounts = utils.schemaCollection('Accounts', {
    title: {
        type: String,
        label: "Account",
        max: 200,
        index: true,
        unique: true
    },
    currencyId: {
        type: Meteor.ObjectID
    }
});