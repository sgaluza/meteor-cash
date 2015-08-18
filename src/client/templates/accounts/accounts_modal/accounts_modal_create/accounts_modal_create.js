Template.accountsModalCreate.events({
    'submit form': function (event, template) {
        $('#accountsModalCreate').modal('hide');

        var parent = template;

        //Blaze.render(Template.accounts, parent);

        console.log(parent);
    }
});