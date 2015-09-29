Accounts = utils.schemaCollection("Accounts", {
    name     : {
        type  : String,
        label : "Account name",
        max   : 200,
        index : true,
        unique: true,
        autoform: {
            placeholder: "Name your account"
        }
    },
    names     : {
        type: "select",
        label : "Please, choose account to re-assign transactions of the removed account to:",
        optional : true
    },
    balance: {
        type: Number,
        min: 0,
        autoform: {
            placeholder: "Enter the initial balance"
        }
    },
    currencyId: {
        type : Meteor.ObjectID,
        label: "Currency",
        autoform: {
            firstOption: "Select the Account currency",
            selectOnBlur: true,
            type: "select",
            options: function () {
                return _.map(currencies, function (item) {
                    return {
                        label: item.name + " (" + item.symbol + ")",
                        value: item.code
                    }
                });
            }
        }
    }
});