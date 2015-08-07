Router.configure({
    layoutTemplate: 'Bootstrap3boilerplate'
});

if (Meteor.isClient) {
    Bootstrap3boilerplate.init();
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

Router.route('/transactions', function () {
    this.render(t)
});