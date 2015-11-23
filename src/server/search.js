SearchSource.defineSource('transactions', function(searchText, option) {
    var options = {sort: {isoScore: -1}, limit: 20};
    console.log(option);
    if(searchText) {
        var regExp = buildRegExp(searchText);
        var selector = {$or: [
            {search: regExp}
        ]};
        return Transactions.find(selector, options).fetch();
    } else {
        return Transactions.find({}, options).fetch();
    }
});

function buildRegExp(searchText) {
    var parts = searchText.trim().split(/[ \-\:]+/);
    return new RegExp("(" + parts.join('|') + ")", "ig");
}