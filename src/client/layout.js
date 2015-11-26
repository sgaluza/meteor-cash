Iron.Router.hooks.customPackageHook = function () {
    Template.registerHelper('currentRouteIs', function (route) {
        return Router.current().route.getName() === route;
    });
    this.next();
};

Router.onBeforeAction('customPackageHook');