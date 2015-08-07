Template.transactionsPanelHeader.events({
    'click ul li': function (event) {
        $(event.currentTarget.parentElement).find('li').removeClass('active');
        $(event.currentTarget).addClass('active');

        Session.set('transactionsPanelTemplate', $(event.target).attr('name'));
    }
});