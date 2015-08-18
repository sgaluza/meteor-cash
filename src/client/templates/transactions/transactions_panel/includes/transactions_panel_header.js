Template.transactionsPanelHeader.helpers({
    activeType: function (routeType) {
        return routeType === Router.current().params.type ? 'active' : '';
    },
    transferOn: function () {
        return Accounts.find().count() > 1;
    }
});