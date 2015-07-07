Bootstrap3boilerplate.init();

Router.configure({
    layoutTemplate: 'Bootstrap3boilerplate'
});


Router.route('/categories', function () {
    this.render('categories');
});

Router.route('/', function () {
    this.render('transactions');
});
