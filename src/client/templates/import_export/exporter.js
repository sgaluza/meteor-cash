MyAppExporter = {
    exportAllTransactionsToCsv: function() {
        var self = this;
        Meteor.call("exportAllTransactionsToCsv", function(error, data) {

            if ( error ) {
                alert(error);
                return false;
            }

            var csv = Papa.unparse(data);
            self._downloadCSV(csv, 'csv');
        });
    },
    exportAllTransactionsToJson: function() {
        var self = this;
        Meteor.call("exportAllTransactionsToJson", function(error, data) {

            if ( error ) {
                alert(error);
                return false;
            }

            self._downloadCSV(data.data, 'json');
        });
    },
    _downloadCSV: function(data, format) {
        var blob = new Blob([data]);
        var a = window.document.createElement("a");
        if (format == 'json') {
            data = JSON.stringify(data, null, "\t");
            a.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(data);
            a.target = '_blank';
        } else if (format == 'csv') {
            a.href = window.URL.createObjectURL(blob, {type: "text/plain"});
        }
        a.download = "transactions." + format;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }
};