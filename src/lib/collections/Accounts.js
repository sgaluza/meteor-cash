Accounts = utils.schemaCollection("Accounts", {
    title     : {
        type  : String,
        label : "Account",
        max   : 200,
        index : true,
        unique: true,
        autoform: {
            placeholder: "Enter your account name"
        }
    },
    balance: {
        type: Number,
        label: "Opening Balance",
        min: 0,
        autoform: {
            placeholder: "Enter value of your balance"
        }
    },
    currencyId: {
        type : Meteor.ObjectID,
        label: "Currency",
        autoform: {
            firstOption: "Select Account's currency",
            selectOnBlur: true,
            type: "select",
            options: function () {
                return _.map(currencies, function (item) {
                    return {
                        label: item.name + " (" + item.symbol + ")",
                        value: item.cc
                    }
                });
            }
        }
    },
    parentId  : {
        type : Meteor.ObjectID,
        label: "Parent Account",
        optional: true,
        autoform: {
            firstOption: "Select Account's parent",
            selectOnBlur: true,
            type : "select",
            options: function () {
                return _(Accounts.find().fetch() || [])
                    .filter(function (item) {
                        return !item.parentId;
                    })
                    .map(function (item) {
                        return {
                            label: item.title,
                            value: item._id
                        }
                    })
                    .value();
            }
        }
    }
});