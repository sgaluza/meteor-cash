Router.configure({
    layoutTemplate: 'layout'
});

if (Meteor.isClient) {
    //Bootstrap3boilerplate.init();
}

Router.route('/', {
    action: function () {
        this.render('transactions');
    }
});

Router.route('/accounts', {
    action: function () {
        this.render('accounts');
    }
});

Router.route('/categories', {
    action: function () {
        this.render('categories');
    }
});

Router.route('/transactions', {
    name: 'transactions',
    action: function () {
        this.render('transactions');
        this.render('transactionsPanelDefault', {to: 'transactionsPanel'});
    }
});

Router.route('/transactions/add/:type', {
    name: 'transactions.add',
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
    action: function () {
        var panelTemplate = '';

        this.render('transactions');

        switch (this.params.type) {
            case 'yield':
                panelTemplate ='transactionsPanelUpdateYield';
                break;
            case 'expense':
                panelTemplate = 'transactionsPanelUpdateExpense';
                break;
            case 'transfer':
                panelTemplate = 'transactionsPanelUpdateTransfer';
                break;
            default:
                panelTemplate = 'transactionsPanelUpdateYield';
        }

        this.render(panelTemplate, {to: 'transactionsPanel'});
    }
});