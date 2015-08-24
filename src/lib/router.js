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
    action: function () {
        this.render('accounts');
    }
});

Router.route('/accounts/edit/:id', {
    name: 'accounts.edit',
    action: function () {
        this.render();
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