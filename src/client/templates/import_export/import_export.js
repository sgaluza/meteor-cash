Template.importExport.events({
    'click #exportTransactions': function () {
        MyAppExporter.exportAllTransactions();
    },
    'click #importTransactions': function (event, template) {
        if (template.find('#csv-file').files[0] && template.find('#csv-file').files[0].name.indexOf('.csv') !== -1) {
            Papa.parse(template.find('#csv-file').files[0], {
                header: true,
                complete: function (results) {
                    _.each(results.data, function(t) {
                        t = _.transform(t, function (result, value, key) {
                            result[key.toLowerCase()] = value;

                        });
                        if (t.type == 'Expense') {
                            t.type = 1;
                        } else if (t.type == 'Income') {
                            t.type = 2;
                        } else if (t.type == 'Transfer') {
                            t.type = 3;
                        }
                        if (t.type == 3) {
                            t.search = new Array(t.account);
                            t.accountTo = _.result(_.find(Accounts.find().fetch(), {'name' : t.accountto}), '_id');
                            t.amountTo = t.amountto;
                        } else {
                            t.search= new Array(t.categories, t.account);
                            t.categories = _.result(_.find(Categories.find().fetch(), {'title' : t.categories}), '_id');
                        }
                        if (t.tags) {
                            var tags = t.tags.split(',');
                            t.tags = [];
                            _.forEach(tags, function(tag) {
                                t.search.push(tag);
                                if (_.find(Tags.find().fetch(), {'title' : tag})) {
                                    t.tags.push(_.result(_.find(Tags.find().fetch(), {'title' : tag}), '_id'));
                                } else {
                                    Tags.insert({'title' : tag});
                                    t.tags.push(_.result(_.find(Tags.find().fetch(), {'title' : tag}), '_id'));
                                }
                            });
                        }
                        if (t.notes) {
                            t.search.push(t.notes);
                        }
                        t.account = _.result(_.find(Accounts.find().fetch(), {'name' : t.account}), '_id');
                        t.date = moment(new Date(t.date.replace(/(\d+)\/(\d+)\/(\d+)/, '$2/$1/$3'))).add(3, 'hours').toDate();
                        Transactions.insert(t);
                    });
                },
                skipEmptyLines: true
            });
        }
    }
});