Template.transactionsPanelHeader.events({
    'click ul li': function (event) {
        $(event.currentTarget.parentElement).find('li').removeClass('active');
        $(event.currentTarget).addClass('active');

        Session.set('transactions_panelTemplate', $(event.target).attr('name'));
    }
});

Template.transactionsPanelHeader.helpers({
    transferOn: function () {
        return Accounts.find().count() > 1;
    }
});