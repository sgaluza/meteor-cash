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
            if (doc.tags && doc.tags.length > 0){
                _.forEach(doc.tags, function(t, key) {
                    doc.search.push(doc.tags[key]);
                    doc.tags[key] = Tags.findOne({title: t})._id;
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
            $('input[data-schema-key=tags]').tagsinput('removeAll');
            $('input[data-schema-key=payer]').tagsinput('removeAll');
            $(".bootstrap-tagsinput").addClass('hidden');
        }
    },
    updateTransaction: {
        formToModifier: function(doc) {
            doc.$set.search = [];
            doc.$set.search.push(_.result(Categories.findOne(doc.$set.categories), 'title'));
            doc.$set.search.push(_.result(Accounts.findOne(doc.$set.account), 'name'));
            if (doc.$set.notes) {
                doc.$set.search.push(doc.$set.notes);
            }
            if (doc.$set.tags && doc.$set.tags.length > 0){
                _.forEach(doc.$set.tags, function(t, key) {
                    doc.$set.search.push(doc.$set.tags[key]);
                    doc.$set.tags[key] = Tags.findOne({title: t})._id;
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
            if (doc.tags && doc.tags.length > 0){
                _.forEach(doc.tags, function(t, key) {
                    doc.tags[key] = Tags.findOne({_id: t}).title;
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