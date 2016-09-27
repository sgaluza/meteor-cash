AutoForm.hooks({
    insertAccount: {
        formToDoc: function(doc) {
            return doc;
        },
        onSuccess: function() {
            $('#accountsModalCreate').modal('hide');
            var currencyId = this.insertDoc.currencyId,
                currency = _.result(_.find(currencies, function(c){return c.code == currencyId}), 'symbol');
            alertify.log('Account <strong>' + this.insertDoc.name + '</strong> with balance <strong>' + this.insertDoc.balance + ' ' + currency + '</strong> was created');
        }
    },
    updateAccount: {
        formToModifier: function(doc) {
            return doc;
        },
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
            if (doc.accountTo) {
                doc.search.push(_.result(Accounts.findOne(doc.accountTo), 'name'));
            }
            if (doc.payer && doc.payer.length > 0){
                _.forEach(doc.payer, function(r, key) {
                    doc.search.push(doc.payer[key]);
                    doc.payer[key] = Tags.findOne({title: r})._id;
                })
            }
            if (doc.type === 3) {
                doc.search.push('transfer');
            }
            return doc;
        },
        onSuccess: function(){
            var account = _.result(Accounts.findOne(this.insertDoc.account), 'name'),
                currencyId = _.result(Accounts.findOne(this.insertDoc.account), 'currencyId'),
                currency = _.result(_.find(currencies, function(c){return c.code == currencyId}), 'symbol'),
                accountTo = _.result(Accounts.findOne(this.insertDoc.accountTo), 'name'),
                currencyIdTo = _.result(Accounts.findOne(this.insertDoc.accountTo), 'currencyId'),
                currencyTo = _.result(_.find(currencies, function(c){return c.code == currencyIdTo}), 'symbol'),
                category = '',
                type = this.insertDoc.type;
            if (this.insertDoc.categories) {
                var category = ' (category: <strong>' + _.result(Categories.findOne(this.insertDoc.categories), 'title') + '</strong>)';
            }
            switch(type){
                case 1:
                    alertify.log('<strong>Income</strong> Transaction (<strong>' + this.insertDoc.amountTo + ' ' + currencyTo + '</strong>) was added for account <strong>' + accountTo + '</strong>' + category);
                    break;
                case 2:
                    alertify.log('<strong>Expense</strong> Transaction (<strong>' + this.insertDoc.amount + ' ' + currency + '</strong>) was added for account <strong>' + account + '</strong>' + category);
                    break;
                case 3:
                    alertify.log('<strong>Transfer</strong> Transaction (<strong>' + this.insertDoc.amount + ' ' + currency + '</strong>) from account <strong>' + account + '</strong> to account  <strong>' + accountTo + ' (' + this.insertDoc.amountTo + ' ' + currencyTo + '</strong>) was added');
                    break;
            }
            $('input[data-schema-key=date]').datepicker('setDate', new Date());
            $('input[data-schema-key=amount]').val(0);
            $('input[data-schema-key=amountTo]').val(0);
            $('input[data-schema-key=tags]').tagsinput('removeAll');
            $('input[data-schema-key=payer]').tagsinput('removeAll');
        }
    },
    updateTransaction: {
        formToModifier: function(doc) {
            if (!doc.$set.amount) {
                doc.$set.amount = 0;
            }
            if (doc.$set.type === 3) {
                if (!doc.$set.amountTo) {
                    doc.$set.amountTo = 0;
                }
            }
            doc.$set.search = [];
            doc.$set.search.push(_.result(Categories.findOne(doc.$set.categories), 'title'));
            doc.$set.search.push(_.result(Accounts.findOne(doc.$set.account), 'name'));
            if (doc.$set.accountTo) {
                doc.$set.search.push(_.result(Accounts.findOne(doc.$set.accountTo), 'name'));
            }
            if (doc.$set.notes) {
                doc.$set.search.push(doc.$set.notes);
            }
            if (doc.$set.tags && doc.$set.tags.length > 0){
                _.forEach(doc.$set.tags, function(t, key) {
                    doc.$set.search.push(doc.$set.tags[key]);
                    doc.$set.tags[key] = Tags.findOne({title: t})._id;
                })
            }
            if (doc.type === 3) {
                doc.search.push('transfer');
            }
            if (doc.$set.payer && doc.$set.payer.length > 0){
                _.forEach(doc.$set.payer, function(r, key) {
                    doc.$set.search.push(doc.$set.payer[key]);
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
            var account = _.result(Accounts.findOne(this.updateDoc.$set.account), 'name'),
                currencyId = _.result(Accounts.findOne(this.updateDoc.$set.account), 'currencyId'),
                currency = _.result(_.find(currencies, function(c){return c.code == currencyId}), 'symbol'),
                accountTo = _.result(Accounts.findOne(this.updateDoc.$set.accountTo), 'name'),
                currencyIdTo = _.result(Accounts.findOne(this.updateDoc.$set.accountTo), 'currencyId'),
                currencyTo = _.result(_.find(currencies, function(c){return c.code == currencyIdTo}), 'symbol'),
                category = '',
                type = this.updateDoc.$set.type;
            if (this.updateDoc.$set.categories) {
                var category = ' (category: <strong>' + _.result(Categories.findOne(this.updateDoc.$set.categories), 'title') + '</strong>)';
            }
            switch(type){
                case 1:
                    alertify.log('<strong>Income</strong> Transaction (<strong>' + this.updateDoc.$set.amountTo + ' ' + currencyTo + '</strong>) was updated for account <strong>' + accountTo + '</strong>' + category);
                    break;
                case 2:
                    alertify.log('<strong>Expense</strong> Transaction (<strong>' + this.updateDoc.$set.amount + ' ' + currency + '</strong>) was updated for account <strong>' + account + '</strong>' + category);
                    break;
                case 3:
                    alertify.log('<strong>Transfer</strong> Transaction (<strong>' + this.updateDoc.$set.amount + ' ' + currency + '</strong>) from account <strong>' + account + '</strong> to account  <strong>' + accountTo + ' (' + this.updateDoc.$set.amountTo + ' ' + currencyTo + '</strong>) was updated');
                    break;
            }
        }
    }
});