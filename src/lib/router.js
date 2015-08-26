Router.configure({
    layoutTemplate: 'layout'
});

Router.route('/', {
    action: function () {
        this.render('overview');
    }
});

Router.route('/overview', {
    action: function () {
        this.render('overview');
    }
});

Router.route('/accounts', {
    name: 'accounts',
    onBeforeAction: function () {
        if (Meteor.subscribe('Accounts')) {
            this.next();
        }
    },
    action: function () {
        this.render('accounts', {
            data: function () {
                return {
                    accounts: Accounts.find()
                }
            }
        });
    }
});

Router.route('/accounts/edit/:id', {
    name: 'accounts.edit',
    onBeforeAction: function () {
        if (Meteor.subscribe('Accounts')) {
            Session.set('accounts_updatedId', this.params.id);
            this.next();
        }
    },
    action: function () {
        this.render('accounts', {
            data: function () {
                return {
                    accounts: Accounts.find()
                }
            }
        });
    },
    onStop: function () {
        Session.set('accounts_updatedId', null);
    }
});

Router.route('/categories', {
    action: function () {
        this.render('categories');
    }
});

Router.route('/transactions', {
    name: 'transactions',
    onBeforeAction: function () {
        if (Meteor.subscribe('Accounts') &&
            Meteor.subscribe('Categories') &&
            Meteor.subscribe('Transactions')) {
            this.next();
        }
    },
    action: function () {
        this.render('transactions');
        this.render('transactionsPanelDefault', {to: 'transactionsPanel'});
    }
});

Router.route('/transactions/add/:type', {
    name: 'transactions.add',
    onBeforeAction: function () {
        if (Meteor.subscribe('Accounts') &&
            Meteor.subscribe('Categories') &&
            Meteor.subscribe('Transactions')) {
            this.next();
        }
    },
    action: function () {
        var panelTemplate = '';

        this.render('transactions');

        switch (this.params.type) {
            case 'yield':
                panelTemplate ='transactionsPanelYield';
                break;
            case 'expense':
                panelTemplate = 'transactionsPanelExpense';
                break;
            case 'transfer':
                panelTemplate = 'transactionsPanelTransfer';
                break;
            default:
                panelTemplate = 'transactionsPanelYield';
        }

        this.render(panelTemplate, {to: 'transactionsPanel'});
    }
});

Router.route('/transactions/update/:type/:id', {
    name: 'transactions.update',
    onBeforeAction: function () {
        if (Meteor.subscribe('Accounts') &&
            Meteor.subscribe('Categories') &&
            Meteor.subscribe('Transactions')) {
            this.next();
        }
    },
    action: function () {
        var panelTemplate = '';

        this.render('transactions');

        switch (this.params.type) {
            case 'yield':
                panelTemplate ='transactionsPanelYieldUpdate';
                break;
            case 'expense':
                panelTemplate = 'transactionsPanelExpenseUpdate';
                break;
            case 'transfer':
                panelTemplate = 'transactionsPanelTransferUpdate';
                break;
            default:
                panelTemplate = 'transactionsPanelYieldUpdate';
        }

        this.render(panelTemplate, {to: 'transactionsPanel'});
    }
});