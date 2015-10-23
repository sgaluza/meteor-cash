Template.afInputNumber_mcExpense.helpers({
    'currencyForAmount': function () {
        var accountId = Session.get('transactions_accountId');
        var currencyCode = _.result(Accounts.findOne(accountId), 'currencyId');

        return _.result(_.find(currencies, function(c){return c.code == currencyCode}), 'symbol');
    }
});

Template.afInputNumber_mcIncome.helpers({
    'currencyForAmount': function () {
        var accountId = Session.get('transactions_accountToId');
        var currencyCode = _.result(Accounts.findOne(accountId), 'currencyId');

        return _.result(_.find(currencies, function(c){return c.code == currencyCode}), 'symbol');
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
    insertAccount: {
        onSuccess: function() {
            $('#accountsModalCreate').modal('hide');
            var currencyId = this.insertDoc.currencyId,
                currency = _.result(_.find(currencies, function(c){return c.code == currencyId}), 'symbol');
            alertify.log('Account <strong>' + this.insertDoc.name + '</strong> with balance <strong>' + this.insertDoc.balance + ' ' + currency + '</strong> was created');
        }
    },
    updateAccount: {
        onSuccess: function() {
            $('#accountsModalUpdate').modal('hide');
            var currencyId = this.updateDoc.$set.currencyId,
                currency = _.result(_.find(currencies, function(c){return c.code == currencyId}), 'symbol');
            alertify.log('Account <strong>' + this.updateDoc.$set.name + '</strong> with balance <strong>' + this.updateDoc.$set.balance + ' ' + currency + '</strong> was updated');
        }
    },
    insertCategory: {
        onSuccess: function() {
            $('#categoriesModalCreate').modal('hide');
            $('#categoriesTree').tree('loadData', Template.categories.getTree());
            var parent = '';
            if (this.insertDoc.parentId) {
                parent = '(with parent category <strong>' + _.result(Categories.findOne(this.insertDoc.parentId), 'title') + '</strong>)';
            }
            alertify.log('Category <strong>' + this.insertDoc.title + '</strong> ' + parent + ' was created');
        }
    },
    updateCategory: {
        onSuccess: function() {
            $('#categoriesModalUpdate').modal('hide');
            if (this.updateDoc.$set.parentId) Categories.update({"_id": this.currentDoc._id}, {$unset: {"order": ""}})
            $('#categoriesTree').tree('loadData', Template.categories.getTree());
            var parent = '';
            if (this.updateDoc.$set.parentId) {
                parent = '(with parent category <strong>' + _.result(Categories.findOne(this.updateDoc.$set.parentId), 'title') + '</strong>)';
            }
            Router.go('/categories');
            alertify.log('Category <strong>' + this.updateDoc.$set.title + '</strong> ' + parent + ' was updated');
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
            var user = _.result(Accounts.findOne(this.insertDoc.account), 'name'),
                currencyId = _.result(Accounts.findOne(this.insertDoc.account), 'currencyId'),
                currency = _.result(_.find(currencies, function(c){return c.code == currencyId}), 'symbol'),
                category = '',
                type;
            if (this.insertDoc.type == 2) {
                type = 'Expense';
                Accounts.update({_id: this.insertDoc.account}, {$inc: {balance: -this.insertDoc.amount}});
            } else if (this.insertDoc.type == 1) {
                type = 'Income';
                Accounts.update({_id: this.insertDoc.account}, {$inc: {balance: this.insertDoc.amount}});
            } else if (this.insertDoc.type == 3) {
                type = 'Transfer';
                Accounts.update({_id: this.insertDoc.account}, {$inc: {balance: -this.insertDoc.amount}});
                Accounts.update({_id: this.insertDoc.accountTo}, {$inc: {balance: this.insertDoc.amountTo}});
            }
            if (this.insertDoc.categories) {
                var category = ' (category: <strong>' + _.result(Categories.findOne(this.insertDoc.categories), 'title') + '</strong>)';
            }
            alertify.log('<strong>' + type + '</strong> Transaction (<strong>' + this.insertDoc.amount + ' ' + currency + '</strong>) was added for account <strong>' + user + '</strong>' + category);
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
        },
        onSuccess: function(){
            var user = _.result(Accounts.findOne(this.updateDoc.$set.account), 'name'),
                currencyId = _.result(Accounts.findOne(this.updateDoc.$set.account), 'currencyId'),
                currency = _.result(_.find(currencies, function(c){return c.code == currencyId}), 'symbol'),
                category = '',
                type = '';
            if (this.updateDoc.$set.type == 2) {
                type = 'Expense';
                Accounts.update({_id: this.updateDoc.$set.account}, {$inc: {balance: this.currentDoc.amount-this.updateDoc.$set.amount}});
            } else if (this.updateDoc.$set.type == 1) {
                type = 'Income';
                Accounts.update({_id: this.updateDoc.$set.account}, {$inc: {balance: this.updateDoc.$set.amount-this.currentDoc.amount}});
            } else if (this.updateDoc.$set.type == 3) {
                type = 'Transfer';
                Accounts.update({_id: this.updateDoc.$set.account}, {$inc: {balance: this.currentDoc.amount-this.updateDoc.$set.amount}});
                Accounts.update({_id: this.updateDoc.$set.accountTo}, {$inc: {balance: this.updateDoc.$set.amountTo-this.currentDoc.amount}});
            }
            if (this.updateDoc.$set.categories) {
                var category = ' (category: <strong>' + _.result(Categories.findOne(this.updateDoc.$set.categories), 'title') + '</strong>)';
            }
            alertify.log('<strong>' + type + '</strong> Transaction (<strong>' + this.updateDoc.$set.amount + ' ' + currency + '</strong>) was updated for account <strong>' + user + '</strong>' + category);
        }
    }
});