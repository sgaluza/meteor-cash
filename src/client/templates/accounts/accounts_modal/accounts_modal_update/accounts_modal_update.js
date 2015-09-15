Template.accountsModalUpdate.helpers({
    updatedDoc: function () {
        return Accounts.findOne({_id: Iron.controller().getParams().hash});
    }
});