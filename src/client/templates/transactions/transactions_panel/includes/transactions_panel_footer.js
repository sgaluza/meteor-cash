Template.transactionsPanelFooter.helpers({
    removeButtonOn: function () {
        return Router.current().route.getName() === 'transactions.update';
    }
});

Template.transactionsPanelFooter.events({
    'click #saveTransactionButton': function (event) {
        if (Router.current().route.getName() === 'transactions.update') {
            Router.go('/transactions/add/expense');
        }
        else {
            Session.set('transactions_accountId', null);
            Session.set('transactions_accountToId', null);
        }
    },
    'click #cancelTransactionButton': function (event) {
        if (Router.current().route.getName() === 'transactions.update') {
            switch (Router.current().params.type) {
                case 'expense':
                    Router.go('/transactions/add/expense');
                    break;
                case 'yield':
                    Router.go('/transactions/add/yield');
                    break;
                case 'transfer':
                    Router.go('/transactions/add/transfer');
                    break;
                default:
                    Router.go('/transactions/add/transfer');
            }
        }
        else {
            Session.set('transactions_accountId', null);
            Session.set('transactions_accountToId', null);
            $(':input','#insertTransaction')
                .not(':button, :submit, :reset, :input[name="date"]')
                .val('')
                .removeAttr('checked')
                .removeAttr('selected');
            $('input[data-schema-key=recipient]').tagsinput('removeAll');
            $('input[data-schema-key=payer]').tagsinput('removeAll');
            $(".bootstrap-tagsinput").addClass('hidden');
        }
    },
    'click #removeTransactionButton': function () {
        $('#transactionsModalDelete').modal();
    }
});