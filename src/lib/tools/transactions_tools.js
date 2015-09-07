if (Meteor.isClient) {
    var config = {
        session_categoriesTags: 'transactions_categoriesTags',
        session_selectedRow   : 'transactions_selectedRow',
        session_panelTemplate : 'transactions_panelTemplate'
    };

    function TransactionsTools(config) {
        this._cfg = config;
    }

    TransactionsTools.prototype.setPanelTemplate = function (template) {
        Session.set(this._cfg.session_panelTemplate, template);
    };

    TransactionsTools.prototype.getPanelTemplate = function () {
        console.log();

        Session.get(this._cfg.session_panelTemplate);
    };

    TransactionsTools.prototype.setCategoriesTag = function (id, name) {
        if (!(_.isString(id) && id.length && _.isString(name) && name.length)) {
            return false;
        }

        var categoriesTags = Session.get(this._cfg.session_categoriesTags);

        categoriesTags.push({
            tagId  : id,
            tagName: name
        });

        Session.set(this._cfg.session_categoriesTags, _.uniq(categoriesTags));
    };

    TransactionsTools.prototype.getCategoriesTags = function () {
        return Session.get(this._cfg.session_categoriesTags) || [];
    };

    TransactionsTools.prototype.resetCategoriesTags = function () {
        Session.set(this._cfg.session_categoriesTags, []);
    };

    TransactionsTools.prototype.getSelectedRow = function () {
        Session.get(this._cfg.session_selectedRow);
    };

    transactionsTools = new TransactionsTools(config);
}


