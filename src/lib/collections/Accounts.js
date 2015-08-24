Accounts = utils.schemaCollection("Accounts", {
    name     : {
        type  : String,
        label : "Account name",
        max   : 200,
        index : true,
        unique: true,
        autoform: {
            placeholder: "Enter your account name"
        }
    },
    balance: {
        type: Number,
        defaultValue: 0,
        min: 0
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
    }
});