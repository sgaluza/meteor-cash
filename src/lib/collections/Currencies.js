var query = {enable: true};

Currencies = utils.schemaCollection('Currencies', {
    code: {
        type: String,
        label: "Currency code",
        max: 3,
        index: true,
        unique: true
    },
    name: {
        type: String,
        label: 'Currency name',
        max: 100
    },
    symbol: {
        type: String,
        label: "Currency symbol",
        max: 20
    },
    enable: {
        type: Boolean
    }
}, query);