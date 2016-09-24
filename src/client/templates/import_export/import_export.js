Template.importExport.events({
    'click #exportTransactions': function () {
        MyAppExporter.exportAllTransactionsToCsv();
    },
    'click #importTransactions': function (event, template) {
        if (template.find('#csv-file').files[0] && template.find('#csv-file').files[0].name.indexOf('.csv') !== -1) {
            var reader = new FileReader();
            reader.readAsText(template.find('#csv-file').files[0]);
            reader.onload = function (e) {
                var file = e.target.result.replace(/"(\d+),(\d+)"/g, "$1.$2").replace(/["']/g, "");
                try
                {
                    var data = Papa.parse(file, {header: true});
                    addDateToMongoFromZenmoney(data.data);
                }
                catch(e)
                {
                    alertify.log('invalid csv');
                }
            };
        } else {
            alertify.log('Please, choose *.csv file');
        }
    },
    'click #exportTransactionsJson': function () {
        MyAppExporter.exportAllTransactionsToJson();
    },
    'click #importTransactionsJson': function (event, template) {
        if (template.find('#json-file').files.length !== 0) {
            var reader = new FileReader();
            reader.readAsText(template.find('#json-file').files[0]);
            reader.onload = function (e) {
                var file = e.target.result;
                try
                {
                    var json = JSON.parse(file);
                    addDateToMongo(json);
                }
                catch(e)
                {
                    alertify.log('invalid json');
                }
            };
        }
    }
});

function addDateToMongo(date) {
    var msg;
    _.each(date, function(t) {
        t = _.transform(t, function (result, value, key) {
            result[key.toLowerCase()] = value;

        });
        if (t.type == 'Expense') {
            t.type = 2;
        } else if (t.type == 'Income') {
            t.type = 1;
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
            if (t.tags instanceof Array == true) {
                var tags = t.tags;
            } else {
                var tags = t.tags.split(',');
            }
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
    if (date.length == 0) {
        msg = 'No transactions in this file.';
    } else if (date.length == 1) {
        msg = ' Transaction was imported successful';
    } else {
        msg = date.length + ' Transactions were imported successful';
    }
    alertify.log(msg);
}

function addDateToMongoFromZenmoney(transactions){
    var msg, count = 0;
    var accountNames = transactions.map(function(t){return t.incomeAccountName;})
    Array.prototype.push.apply(accountNames, transactions.map(function(t){return t.outcomeAccountName;}));
    accountNames = _.uniq(accountNames).filter(function(n){return n;});
    var accounts = Accounts.find({name: {$in: accountNames}}).fetch();
    if (accountNames.length > 0 && accounts.length > 0 && accountNames.length == accounts.length){
        transactions.forEach(function(t){
            if (Object.keys(t).length == 12){
                var transaction = {};
                transaction.type = (t.outcome && t.income) ? 3 : (t.outcome) ? 2 : 1;
                transaction.date = moment(t.date).toDate();
                transaction.amount = parseFloat(t.outcome) || "";
                transaction.account = _.result(_.find(accounts, {name : t.outcomeAccountName}), '_id') || "";
                transaction.accountTo = _.result(_.find(accounts, {name : t.incomeAccountName}), '_id') || "";
                transaction.amountTo = parseFloat(t.income) || "";
                transaction.notes = t.comment;
                var category = Categories.findOne({title: t.categoryName});
                transaction.categories = (category) ? category._id : (t.categoryName) ? Categories.insert({title: t.categoryName}) : "";
                transaction.search = new Array(t.outcomeAccountName, t.incomeAccountName, t.comment, t.categoryName);
                transaction.search = _.uniq(transaction.search.filter(function(s){return s;}));
                Transactions.insert(transaction, function(err){if (err) console.log(err);});
                count++;
            }
        });
        if (count == 0) {
            msg = 'No transactions in this file.';
        } else if (count == 1) {
            msg = 'Transaction was imported successful';
        } else {
            msg = count + ' Transactions were imported successful';
        }
        alertify.log(msg);
    }
    else{
        accountNames = _.remove(accountNames, function(a){return accounts.map(function(a){return a.name;}).indexOf(a) == -1;});
        if(accountNames.length>0){
            alertify.log("Please create "+ accountNames.join(", ") + " account(s)");
        }
        else{
            alertify.log('invalid csv');
        }
    }
}
