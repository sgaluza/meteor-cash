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
        optional : true,
        autoform: {
            firstOption: "Select Account",
            selectOnBlur: true,
            type: "select",
            options: function () {
                var currentUser = Accounts.findOne({_id: Iron.controller().getParams().hash});
                if (currentUser) {
                    var users = _.filter(Accounts.find().fetch(), {'currencyId': currentUser.currencyId});
                    var currentUserIndex = _.findIndex(users, function(user) {
                        return user._id === currentUser._id;
                    });
                    users.splice(currentUserIndex, 1);
                    return _.map(users, function (user) {
                        return {
                            label: user.name,
                            value: user._id
                        }
                    });
                }
            },
            disabled: function() {
                var currentUser = Accounts.findOne({_id: Iron.controller().getParams().hash});
                if (currentUser) {
                    var users = _.filter(Accounts.find().fetch(), {'currencyId': currentUser.currencyId});
                    return !(users.length-1);
                }
            }
        }
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