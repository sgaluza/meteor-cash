Currencies = utils.schemaCollection('Currencies', {
    title: {
        type: String,
        label: "Currency",
        max: 200,
        index: true,
        unique: true
    },
    symbol: {
        type: String,
        label: "Symbol",
        max: 20,
        index: true,
        unique: true
    }
});