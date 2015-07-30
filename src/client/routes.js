Router.configure({
    layoutTemplate: 'Bootstrap3boilerplate'
});

if (Meteor.isClient) {
    Bootstrap3boilerplate.init();
}

Router.route('/', function () {
    this.render('transactions');
});

Router.route('/categories', {
    waitOn: function () {
        return Meteor.subscribe('Categories');
    },
    action: function () {
        this.render('categories');
    }
});