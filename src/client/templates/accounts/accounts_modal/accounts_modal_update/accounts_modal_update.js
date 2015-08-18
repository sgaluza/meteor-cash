Template.accountsModalUpdate.helpers({
    docForUpdate: function () {
        return Accounts.findOne({_id: Session.get('docForUpdate')});
    }
});