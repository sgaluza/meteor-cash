Template.afInputNumber_mcExpense.helpers({
    'currencyForAmount': function () {
        var accountId = Session.get('transactions_accountId');
        var currencyCode = _.result(Accounts.findOne(accountId), 'currencyId');

        return _.result(_.find(currencies, function(c){return c.code == currencyCode}), 'symbol');
    }
});

Template.afInputNumber_mcIncome.helpers({
    'currencyForAmount': function () {
        var accountId = Session.get('transactions_accountId');
        var currencyCode = _.result(Accounts.findOne(accountId), 'currencyId');

        return  _.result(_.find(currencies, function(c){return c.code == currencyCode}), 'symbol');
    }
});

Template.afInputNumber_mcTransfer.helpers({
    'currencyForAmountTo': function () {
        var accountToId = Session.get('transactions_accountToId');
        var currencyCode = _.result(Accounts.findOne(accountToId), 'currencyId');

        return _.result(_.find(currencies, function(c){return c.code == currencyCode}), 'symbol');
    }
});


AutoForm.hooks({
    categoryEdit: {
        onSuccess: function(){
            Template.categories.initTree();
        }
    },
    categoryUpdate: {
        onSuccess: function(){
            Template.categories.initTree();
        }
    },
    insertAccount: {
        onSuccess: function() {
            $('#accountsModalCreate').modal('hide');
        }
    },
    updateAccount: {
        onSuccess: function() {
            $('#accountsModalUpdate').modal('hide');
        }
    },
    insertCategory: {
        onSuccess: function() {
            $('#categoriesModalCreate').modal('hide');
            Session.set('categories_tree', Template.categories.getTree());
        }
    },
    updateCategory: {
        onSuccess: function() {
            $('#categoriesModalUpdate').modal('hide');
            Session.set('categories_tree', Template.categories.getTree());
        }
    },
    insertTransaction: {
        formToDoc: function(doc) {
            if (doc.recipient && doc.recipient.length > 0){
                _.forEach(doc.recipient, function(r, key) {
                    doc.recipient[key] = Tags.findOne({title: r})._id;
                })
            }
            if (doc.payer && doc.payer.length > 0){
                _.forEach(doc.payer, function(r, key) {
                    doc.payer[key] = Tags.findOne({title: r})._id;
                })
            }
            return doc;
        },
        onSuccess: function(){
            $('input[data-schema-key=recipient]').tagsinput('removeAll');
            $('input[data-schema-key=payer]').tagsinput('removeAll');
            $(".bootstrap-tagsinput").addClass('hidden');
        }
    },
    updateTransaction: {
        formToModifier: function(doc) {
            if (doc.$set.recipient && doc.$set.recipient.length > 0){
                _.forEach(doc.$set.recipient, function(r, key) {
                    doc.$set.recipient[key] = Tags.findOne({title: r})._id;
                })
            }
            if (doc.$set.payer && doc.$set.payer.length > 0){
                _.forEach(doc.$set.payer, function(r, key) {
                    doc.$set.payer[key] = Tags.findOne({title: r})._id;
                })
            }
            return doc;
        },
        docToForm: function(doc) {
            if (doc.recipient && doc.recipient.length > 0){
                _.forEach(doc.recipient, function(r, key) {
                    doc.recipient[key] = Tags.findOne({_id: r}).title;
                })
            }
            if (doc.payer && doc.payer.length > 0){
                _.forEach(doc.payer, function(r, key) {
                    doc.payer[key] = Tags.findOne({_id: r}).title;
                })
            }
            return doc;
        }
    }
});