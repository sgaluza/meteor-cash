Parties = utils.schemaCollection('Parties', {
    title: {
        type: String,
        label: "Party",
        max: 200,
        index: true,
        unique: true
    }
});