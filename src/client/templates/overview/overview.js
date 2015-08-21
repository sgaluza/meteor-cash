Template.overview.overviewChart = function() {
    return {
        chart: {
            type: 'spline'
        },
        title: {
            text: 'Accounts state overview'
        },
        subtitle: {
            text: 'Changes in transactions for each account'
        },
        xAxis: {
            type: 'datetime',
            dateTimeLabelFormats: {
                month: '%e. %b',
                year: '%b'
            },
            title: {
                text: 'Date'
            }
        },
        yAxis: {
            title: {
                text: 'Balance'
            },
            min: 0
        },
        tooltip: {
            headerFormat: '<b>{series.name}</b><br>',
            pointFormat: '{point.x:%e. %b}: {point.y:.2f} m'
        },

        plotOptions: {
            spline: {
                marker: {
                    enabled: true
                }
            }
        },

        series: getChart() //_.map(Transactions.find())
        //    [{
        //    name: "Winter 2013-2014",
        //    data: [
        //        [Date.UTC(1970, 9, 29), 0],
        //        [Date.UTC(1970, 10, 9), 0.4],
        //        [Date.UTC(1970, 11, 1), 0.25],
        //    ]
        //}]
    }
};

var getChart = function () {
    var chart = [];
    var accountsId = [];
    var transactions = Transactions.find().fetch();

    _.forEach(transactions, function (item) {
        if (accountsId.indexOf(item.account) !== -1) {
            var modified = _.find(chart, {id: item.account});
            modified.data.push([item.date, item.amount]);
        } else {
            accountsId.push(item.account);
            chart.push({id: item.account, data: [[new Date(item.date).getTime(), item.amount]]});
        }
    });

    var accounts = Accounts.find({_id: {$in: accountsId}}).fetch();

    return _.map(chart, function (item) {
        return {
            name: _.result(_.find(accounts, {_id: item.id}), 'title'),
            data: item.data
        }
    });
};